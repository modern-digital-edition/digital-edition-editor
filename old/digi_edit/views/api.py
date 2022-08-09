import json
import os
import re

from cerberus import Validator
from copy import deepcopy
from hashlib import sha512
from pyramid.httpexceptions import HTTPBadRequest, HTTPUnauthorized, HTTPNotFound, HTTPNoContent
from secrets import token_hex

from digi_edit.models import User, Branch, File
from digi_edit.jsonapi import jsonapi_type_schema


DB_CLASSES = {
    'branches': Branch,
    'files': File,
    'users': User,
}


def includeme(config):
    """Setup the API routes."""
    config.add_route('api', '/api')
    config.add_route('api.login', '/api/login', request_method='POST')
    config.add_view(user_login, route_name='api.login', renderer='json')
    generate_db_api(config, 'users', User)
    generate_db_api(config, 'branches', Branch)
    generate_db_api(config, 'files', File)


def flatten_errors(errors, path=''):
    """Flatten Cerberus errors into the JSONAPI structure."""
    flat_errors = []
    for key, values in errors.items():
        for value in values:
            if isinstance(value, dict):
                flat_errors.extend(flatten_errors(value, path='{0}/{1}'.format(path, key)))
            else:
                flat_errors.append({'title': '{0}{1}'.format(value[0].title(), value[1:]),
                                    'source': {'pointer': '{0}/{1}'.format(path, key)}})
    return flat_errors


def validate_body(body, schema):
    """Validate the request ``body`` against the Cerberus ``schema``. Returns the content of the ``data`` key.

    Raises :class:`~pyramid.httpexceptions.HTTPBadRequest` if the body does not validate. The response contains
    the error(s) formatted in the JSONAPI error structure.

    :param body: The request body
    :type body: ``string``
    :param schema: The Cerberus schema to validate against
    :type schema: ``dict``
    :return: The validated object
    :rtype: ``dict``
    """
    try:
        body = json.loads(body)
        validator = Validator({'data': {'type': 'dict',
                                        'schema': deepcopy(schema),
                                        'required': True}})
        if validator.validate(body):
            return validator.validated(body)['data']
        else:
            raise HTTPBadRequest(body=json.dumps({'errors': flatten_errors(validator.errors)}))
    except json.decoder.JSONDecodeError:
        raise HTTPBadRequest(body=json.dumps({'errors': [
            {'title': 'Invalid JSON Data'}
        ]}))


user_login_schema = {
    'type': jsonapi_type_schema('users'),
    'attributes': {'type': 'dict',
                   'schema': {'email': {'type': 'string',
                                        'required': True,
                                        'empty': False},
                              'password': {'type': 'string',
                                           'required': True,
                                           'empty': False}}}}


def user_login(request):
    """Handle user login."""
    body = validate_body(request.body, user_login_schema)
    user = request.dbsession.query(User).filter(User.email == body['attributes']['email']).first()
    if user:
        hash = sha512()
        hash.update(user.salt.encode('utf-8'))
        hash.update(b'$$')
        hash.update(body['attributes']['password'].encode('utf-8'))
        if user.password == hash.hexdigest():
            user.attributes['token'] = token_hex(64)
            return {'data': user.as_jsonapi(request)}
        else:
            raise HTTPBadRequest(body=json.dumps({
                'errors': [
                    {'title': 'User not found, password incorrect, or blocked',
                     'source': {'pointer': '/data/attributes/email'}},
                    {'title': 'User not found, password incorrect, or blocked',
                     'source': {'pointer': '/data/attributes/password'}},
                ]
            }))
    else:
        raise HTTPBadRequest(body=json.dumps({
            'errors': [
                {'title': 'User not found, password incorrect, or blocked',
                 'source': {'pointer': '/data/attributes/email'}},
                {'title': 'User not found, password incorrect, or blocked',
                 'source': {'pointer': '/data/attributes/password'}},
            ]
        }))


def check_authorization(request):
    """Checks the request for the required authorisation."""
    if 'X-Authorization' in request.headers:
        try:
            userId, token = request.headers['X-Authorization'].split(' ')
            user = request.dbsession.query(User).filter(User.id == userId).first()
            if user and 'token' in user.attributes and user.attributes['token'] == token:
                return user
            else:
                raise HTTPUnauthorized()
        except:
            raise HTTPUnauthorized()
    else:
        raise HTTPUnauthorized()


def set_cache_headers(request):
    """Sets the default no-caching headers."""
    request.response.headers['Cache-Control'] = 'no-store'


def generate_db_api(config, type_name, db_class):
    """Generates the API endpoints for models backed by the database.

    :param config: The Pyramid configuration
    :param type_name: The name of the type
    :type type_name: ``string``
    :param db_class: The DB-model class to generate the endpoints for
    """
    def collection_get(request):
        """Fetch the set of all items."""
        check_authorization(request)
        objs = request.dbsession.query(db_class)
        for key, value in request.params.items():
            match = re.match(r'filter\[([a-zA-Z_\-]+)\]', key)
            if match:
                objs = objs.filter(getattr(db_class, match.group(1)) == value)
        set_cache_headers(request)
        return {'data': [obj.as_jsonapi(request) for obj in objs]}

    def collection_post(request):
        """Create a new item."""
        user = check_authorization(request)
        body = validate_body(request.body, db_class.create_schema())
        obj = db_class()
        for key, value in list(body['attributes'].items()):
            if hasattr(db_class, key):
                setattr(obj, key, value)
                del body['attributes'][key]
        obj.attributes = body['attributes']
        if 'relationships' in body:
            for key, value in body['relationships'].items():
                if isinstance(value['data'], list):
                    setattr(obj, key, [request.dbsession.query(DB_CLASSES[entry['type']]).
                                       filter(DB_CLASSES[entry['type']].id == entry['id']).
                                       first()
                                       for entry in value['data']])
                else:
                    setattr(obj, key, request.dbsession.query(DB_CLASSES[value['data']['type']]).
                        filter(DB_CLASSES[value['data']['type']].id == value['data']['id']).
                        first())
        if hasattr(obj, 'pre_create'):
            obj.pre_create(request, user)
        request.dbsession.add(obj)
        request.dbsession.flush()
        if hasattr(obj, 'post_create'):
            request.dbsession.add(obj)
            obj.post_create(request)
        return {'data': obj.as_jsonapi(request)}

    def item_get(request):
        """Fetch a single item."""
        check_authorization(request)
        obj = request.dbsession.query(db_class).filter(db_class.id == request.matchdict['iid']).first()
        if obj:
            data = obj.as_jsonapi(request)
            set_cache_headers(request)
            return {'data': data}
        else:
            raise HTTPNotFound()

    def item_post(request):
        """Run an action on a single item."""
        check_authorization(request)
        obj = request.dbsession.query(db_class).filter(db_class.id == request.matchdict['iid']).first()
        if obj and hasattr(obj, 'action'):
            if 'X-Action' in request.headers:
                obj.action(request, request.headers['X-Action'])
                return {'data': obj.as_jsonapi(request)}
            else:
                raise HTTPBadRequest()
        else:
            raise HTTPNotFound()


    def item_patch(request):
        """Update a single item."""
        user = check_authorization(request)
        obj = request.dbsession.query(db_class).filter(db_class.id == request.matchdict['iid']).first()
        if obj:
            body = validate_body(request.body, db_class.patch_schema(request))
            for key, value in list(body['attributes'].items()):
                if hasattr(db_class, key):
                    setattr(obj, key, value)
                    del body['attributes'][key]
            obj.attributes = body['attributes']
            if hasattr(obj, 'pre_patch'):
                obj.pre_patch(request, user)
            request.dbsession.add(obj)
            if hasattr(obj, 'post_patch'):
                request.dbsession.flush()
                request.dbsession.add(obj)
                request.dbsession.add(user)
                obj.post_patch(request, user)
            return {'data': obj.as_jsonapi(request)}
        else:
            raise HTTPNotFound()

    def item_delete(request):
        """Delete a single item."""
        check_authorization(request)
        obj = request.dbsession.query(db_class).filter(db_class.id == request.matchdict['iid']).first()
        if obj:
            if hasattr(obj, 'pre_delete'):
                obj.pre_delete(request)
            if 'status' in obj.attributes:
                obj.attributes['status'] = 'deleted'
                return {'data': obj.as_jsonapi(request)}
            else:
                request.dbsession.delete(obj)
                return HTTPNoContent()
        else:
            raise HTTPNotFound()

    config.add_route(f'api.{type_name}.collection.get', f'/api/{type_name}', request_method='GET')
    config.add_view(collection_get, route_name=f'api.{type_name}.collection.get', renderer='json')
    config.add_route(f'api.{type_name}.collection.post', f'/api/{type_name}', request_method='POST')
    config.add_view(collection_post, route_name=f'api.{type_name}.collection.post', renderer='json')
    config.add_route(f'api.{type_name}.item.get', f'/api/{type_name}/{{iid}}', request_method='GET')
    config.add_view(item_get, route_name=f'api.{type_name}.item.get', renderer='json')
    config.add_route(f'api.{type_name}.item.post', f'/api/{type_name}/{{iid}}', request_method='POST')
    config.add_view(item_post, route_name=f'api.{type_name}.item.post', renderer='json')
    config.add_route(f'api.{type_name}.item.patch', f'/api/{type_name}/{{iid}}', request_method='PATCH')
    config.add_view(item_patch, route_name=f'api.{type_name}.item.patch', renderer='json')
    config.add_route(f'api.{type_name}.item.delete', f'/api/{type_name}/{{iid}}', request_method='DELETE')
    config.add_view(item_delete, route_name=f'api.{type_name}.item.delete', renderer='json')

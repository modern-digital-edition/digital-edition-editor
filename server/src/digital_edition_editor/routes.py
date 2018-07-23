def includeme(config):
    config.add_route('editor', '/')
    config.add_route('editor.file', '/editor/*path')
    config.add_route('repositories.get', '/repositories', request_method='GET')
    config.add_route('repository.get', '/repositories/{rid}', request_method='GET')
    config.add_route('repository.put', '/repositories/{rid}', request_method='PUT')
    config.add_route('file.get', '/files/{fid}', request_method='GET')
    config.add_route('file.patch', '/files/{fid}', request_method='PATCH')

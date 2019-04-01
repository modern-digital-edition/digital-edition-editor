import hashlib
import os.path

from django.conf import settings
from django.contrib.auth.decorators import permission_required
from django.http import HttpResponse
from django.shortcuts import render
from git import Repo, Actor

from ..models import Repository


@permission_required('editor.repository.can_read')
def listing(request, rid):
    repository = Repository.objects.get(pk=rid)
    base_path = os.path.join(settings.REPOSITORY_BASE, str(rid), str(request.user.username))
    repo = Repo(base_path)
    tei_files = {}
    for path, _, filenames in os.walk(base_path):
        for filename in filenames:
            if path[len(base_path) + 1:].startswith('content') and filename.endswith('.tei'):
                filename = os.path.join(path[len(base_path) + 1:], filename)
                hash = hashlib.sha256()
                hash.update(filename.encode('utf-8'))
                tei_files[hash.hexdigest()] = filename
    return render(request, 'editor/files.jinja2', {'repository': repository,
                                                   'files': tei_files})


@permission_required('editor.repository.can_read')
def edit(request, rid, fid):
    repository = Repository.objects.get(pk=rid)
    base_path = os.path.join(settings.REPOSITORY_BASE, str(rid), str(request.user.username))
    repo = Repo(base_path)
    tei_file = None
    for path, _, filenames in os.walk(base_path):
        for filename in filenames:
            if path[len(base_path) + 1:].startswith('content') and filename.endswith('.tei'):
                filename = os.path.join(path[len(base_path) + 1:], filename)
                hash = hashlib.sha256()
                hash.update(filename.encode('utf-8'))
                if hash.hexdigest() == fid:
                    tei_file = filename
    return render(request, 'editor/edit.jinja2', {'repository': repository,
                                                  'filename': os.path.basename(tei_file),
                                                  'fid': fid})


@permission_required('editor.repository.can_read')
def raw_tei(request, rid, fid):
    repository = Repository.objects.get(pk=rid)
    base_path = os.path.join(settings.REPOSITORY_BASE, str(rid), str(request.user.username))
    repo = Repo(base_path)
    tei_file = None
    for path, _, filenames in os.walk(base_path):
        for filename in filenames:
            if path[len(base_path) + 1:].startswith('content') and filename.endswith('.tei'):
                filename = os.path.join(path[len(base_path) + 1:], filename)
                hash = hashlib.sha256()
                hash.update(filename.encode('utf-8'))
                if hash.hexdigest() == fid:
                    file_path = os.path.join(base_path, filename)
                    if request.method == 'PATCH':
                        with open(file_path, 'wb') as out_f:
                            out_f.write(request.body)
                        print(base_path)
                        repo = Repo(base_path)
                        if repo.index.diff(None) or repo.index.diff('HEAD'):
                            if 'HTTP_X_COMMIT_MESSAGE' in request.META:
                                commit_msg = request.META['HTTP_X_COMMIT_MESSAGE']
                            else:
                                commit_msg = 'Updated %s' % os.path.basename(file_path)
                            local_commits = list(repo.iter_commits('%s@{u}..%s' % (request.user.username,
                                                                                   request.user.username)))

                            # Ammend the last commit if it has the same commit message as the new one
                            if len(local_commits) > 0 and local_commits[0].message == commit_msg and \
                                local_commits[0].author.email == request.user.email:
                                repo.index.add([os.path.abspath(file_path)])
                                repo.git.commit('--amend',
                                                '-m %s' % commit_msg,
                                                '--author="%s %s <%s>"' % (request.user.first_name,
                                                                           request.user.last_name,
                                                                           request.user.email))
                            else:
                                repo.index.add([os.path.abspath(file_path)])
                                actor = Actor('%s %s' % (request.user.first_name, request.user.last_name),
                                              request.user.email)
                                repo.index.commit(commit_msg, author=actor, committer=actor)
                        return HttpResponse('')
                    else:
                        with open(file_path) as f_in:
                            return HttpResponse(f_in.read(), content_type='application/tei+xml')

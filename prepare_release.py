"""Script to prepare the release of the Digital Edition Editor."""
import re

from datetime import datetime

# Update version numbers
version = '1.2.3'

with open('pyproject.toml') as in_f:
    lines = in_f.readlines()
with open('pyproject.toml', 'w') as out_f:
    for line in lines:
        if line.startswith('version = '):
            out_f.write(f'version = "{version}"\n')
        else:
            out_f.write(line)

with open('docker/Dockerfile') as in_f:
    lines = in_f.readlines()
with open('docker/Dockerfile', 'w') as out_f:
    for line in lines:
        if re.search(r'digi_edit-[0-9]+\.[0-9]+\.[0-9]+(?:b[0-9]+)?', line):
            out_f.write(re.sub(r'digi_edit-[0-9]+\.[0-9]+\.[0-9]+(?:b[0-9]+)?', f'digi_edit-{version}', line))
        else:
            out_f.write(line)

# Build the static changes information

history = []
changes = []
release = None

with open('CHANGES.md') as in_f:
    for line in in_f:
        line = line.strip()
        match = re.fullmatch(r'## ([0-9]+\.[0-9]+\.[0-9]+) \(([0-9]+)\.([0-9]+)\.([0-9]+)\)', line)
        if match:
            if release and changes:
                history.append(
                    {'version': release[0],
                     'date': release[1].isoformat(),
                     'changes': changes}
                )
                changes = []
            release = (match.group(1), datetime(int(match.group(4)), int(match.group(3)), int(match.group(2))))
        if release:
            match = re.fullmatch(r'\* \*\*(New|Update|Bugfix)\*\*: (.+)', line)
            if match:
                changes.append({'type': match.group(1).lower(),
                                'message': match.group(2)})

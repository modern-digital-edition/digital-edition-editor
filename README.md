# Digital Edition Editor

The Digital Edition Editor is a generic web application for managing a digital edition

## Development

To build and run the server locally the following tools are required:

* Python version 3.8 or greater: https://www.python.org/
* Poetry: https://python-poetry.org/
* NodeJS version 12 or greater: https://nodejs.org/en/
* Yarn 1: https://classic.yarnpkg.com/lang/en/

All further local dependencies are installed using the following commands:

```
poetry install
yarn install
```

To activate the virtual environment run

```
poetry shell
```

To create the development configuration run

```
digi_edit -c development.ini create-config -d
digi_edit -c development.ini init-db
```

To build the JavaScript / CSS libraries run

```
gulp
```

or

```
gulp watch
```

To run the server for development run:

```
poetry run pserve --reload development.ini
```

The application is then available at http://localhost:6543/

## Release

1. Run python prepare_release.py
2. Commit changes
3. Tag changes with v{version}
4. Push commit and tags
5. Wait for the base Docker image to build
6. Tag application versions
7. Push tags

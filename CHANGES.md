# Changes

## Development ()

## 1.2.3 (28.02.2025)

* **Bugfix**: Fix tiptap editor

## 1.2.2 (28.02.2025)

* **New**: Crossplatform arm64/amd64 build

## 1.2.1 (26.05.2023)

* **Bugfix**: Fixed a security issue in Tornado

## 1.2.0 (16.12.2022)

* **New**: Added ability to change a user password via the CLI
* **Bugfix**: Fixed an issue with the cookie extraction

## 1.1.4 (16.12.2022)

* **Update**: Updated the dependencies

## 1.1.3 (31.08.2022)

* **Bugfix**: Fix the URL pattern for the user

## 1.1.2 (12.08.2022)

* **Update**: Set git committer name on checkout
* **Bugfix**: Ensure the e-mail address is lower-case

## 1.1.1 (10.08.2022)

* **New**: Added user profile editing

## 1.1.0 (09.08.2022)

* **Update**: Stability fixes for the backend

## 1.0.2 (18.04.2022)

* **Update**: Changed the Docker repository name

## 1.0.1 (13.03.2022)

* **Update**: Support negative serialisation weights

## 1.0.0 (03.03.2022)

* **Bugfix**: Fixed an attribute selection bug

## 1.0.0b18 (03.02.2022)

* **New**: User Interface rewritten

## 0.16.7 (21.06.2021)

* **Bugfix**: TEI Editor upgrade

## 0.16.6 (16.06.2021)

* **New**: Added favicon
* **Bugfix**: Fix incorrect Cache-Control settings

## 0.16.5 (15.06.2021)

* **Bugfix**: Prevent users from saving when editing a nested document

## 0.16.4 (14.06.2021)

* **Bugfix**: Improve cache control

## 0.16.3 (11.06.2021)

* **Bugfix**: Fix setting an incorrect default branch prefix

## 0.16.2 (10.06.2021)

* **Bugfix**: Fix branch matching in webhooks

## 0.16.1 (09.06.2021)

* **Bugfix**: TEI Editor upgrade

## 0.16.0 (08.06.2021)

* **Update**: Support branch name prefixes
* **Bugfix**: TEI Editor upgrade

## 0.15.2 (29.04.2021)

* **Update**: TEI Editor upgrade allows for linking across sections

## 0.15.1 (26.04.2021)

* **Bugfix**: Fixed release errors

## 0.15.0 (26.04.2021)

* **New**: Add support for adding files
* **Update**: TEI Editor upgrade

## 0.14.2 (22.02.2021)

* **Bugfix**: Fix missing version and documentation updates

## 0.14.1 (22.02.2021)

* **Bugfix**: Fix the docker images

## 0.14.0 (22.02.2021)

* **New**: Add an error indicator if saving a document fails (#5)
* **New**: Add an error indicator if the network connection is lost (#6)
* **Update**: Performance update in the text editor
* **Bugfix**: Fix menu styling

## 0.13.0 (08.10.2020)

* **New**: Allow marking paragraphs as extracts
* **Update**: TEI Editor upgrade

## 0.12.1 (06.10.2020)

* **Bugfix**: Fix a filtering bug

## 0.12.0 (06.10.2020)

* **New**: Allow filtering of tasks by status
* **New**: Implemented pagination of tasks
* **New**: Added "About" information
* **New**: Added a help viewer
* **Update**: Various small UX Updates
* **Bugfix**: Fix the date display for the tasks
* **Bugfix**: Fix missing authors on delete / integrate

## 0.11.0 (05.10.2020)

* **Update**: Add margin and indentation attributes
* **Update**: Add quick-links to actions on the edition overview
* **Update**: Improved the UX for review comments
* **Bugfix**: Fixed a bug in the github pull request handling
* **Bugfix**: Dependency update to fix Prosemirror errors

## 0.10.9 (07.08.2020)

* **Update**: On remote push events, run a pull in the webhook

## 0.10.8 (05.08.2020)

* **Bugfix**: Newly scanned files were not being committed

## 0.10.7 (03.08.2020)

* **Bugfix**: Fix various bugs with nested documents

## 0.10.6 (30.07.2020)

* **Update**: Support serving extra files
* **Bugfix**: Fix white-space issues in the TEI editor

## 0.10.5 (29.07.2020)

* **Update**: Minimally improved the UX in the metadata editor

## 0.10.4 (29.07.2020)

* **Bugfix**: Fixed a bug in force-fetching default branch updates

## 0.10.3 (28.07.2020)

* **Bugfix**: Fixed a bug in fetching default branch updates

## 0.10.2 (28.07.2020)

* **Update**: Improved the UX for branch actions

## 0.10.1 (28.07.2020)

* **Update**: Updated the branch overview UX
* **Bugfix**: Fixed a bug in the file sorting
* **Bugfix**: Force fetching the default branch
* **Bugfix**: Explicitly specify the default branch

## 0.10.0 (23.07.2020)

* **Update**: Rewritten using Pyramid + API + complete Vue.js frontend

## 0.9.9 (04.05.2020)

* **Update**: Removed old source data identifier attribute

## 0.9.8 (24.03.2020)

* **Bugfix**: Generate the missing JavaScript files

## 0.9.7 (24.03.2020)

* **Bugfix**: Update the TEI editor to 0.7.2

## 0.9.6 (16.03.2020)

* **Update**: Update the TEI editor

## 0.9.5 (12.03.2020)

* **Bugfix**: Handle git merge errors more cleanly

## 0.9.4 (11.03.2020)

* **New**: Added support for marking up signatures
* **New**: Added support for paragraph alignment in footnotes and annotations

## 0.9.3 (04.02.2020)

* **Update**: Updated the TEI editor dependency

## 0.9.2 (30.01.2020)

* **Update**: Updated icons in the menu

## 0.9.1 (27.01.2020)

* **Update**: Updated the TEI editor dependency for some performance improvements

## 0.9.0 (24.01.2020)

* **Update**: Updated to use the new TEI editor

## 0.8.13 (10.12.2019)

* **Update**: Updated the documentation
* **Update**: Improved the labeling for date metadata inputs

## 0.8.12 (10.12.2019)

* **Bugfix**: Updated the TEI editor dependency

## 0.8.11 (10.12.2019)

* **Bugfix**: Updated the TEI editor dependency

## 0.8.10 (05.12.2019)

* **Bugfix**: Updated the config to actually enable the deduplication

## 0.8.9 (04.12.2019)

* **Update**: Updated TEI editor to address duplicate metadata issue

## 0.8.8 (02.12.2019)

* **Bugfix**: Missing menu options in the editor

## 0.8.7 (02.12.2019)

* **New**: Support marking up text variants

## 0.8.6 (02.12.2019)

* **Bugfix**: Added missing translations

## 0.8.5 (02.12.2019)

* **New**: Added a preview link

## 0.8.4 (29.11.2019)

* **New**: Show the currently logged in user
* **Update**: Re-label menu items
* **Bugfix**: Fix issue with editing new files

## 0.8.3 (28.11.2019)

* **Bugfix**: Fix issue with invalid TEI being generated

## 0.8.2 (28.11.2019)

* **Update**: Disable merging again

## 0.8.1 (28.11.2019)

* **Update**: Link to the existing merge request if available
* **Bugfix**: Hide spinner when opening the documentation

## 0.8.0 (28.11.2019)

* **New**: Use rebasing where possible when merging changes from the master branch

## 0.7.1 (27.11.2019)

* **Bugfix**: Updated the TEI editor dependency

## 0.7.0 (21.11.2019)

* **New**: Don't allow merge requests when one already exists.
* **Update**: Added level 4 headings

## 0.6.1 (15.11.2019)

* **New**: Enable marking up missing editorial notes

## 0.6.0 (14.11.2019)

* **New**: Enabled password changing

## 0.5.1 (14.11.2019)

* **Update**: Fix help link to open in a new window

## 0.5.0 (14.11.2019)

* **New**: Link to external help documentation
* **Update**: Make footnotes stylable
* **Update**: Change indentation rendering
* **Update**: Change how text changes are encoded
* **Bugfix**: Fixed inability to create new individual annotations

## 0.4.4 (08.11.2019)

* **New**: Support footnotes
* **New**: Support corrections and lemmas
* **Update**: Improve synchronisation robustness
* **Update**: Improved user interface labels

## 0.4.3 (11.10.2019)

* **Bugfix**: Generate missing CSS prefixes

## 0.4.2 (11.10.2019)

* **Bugfix**: Don't serialise empty attributes
* **Bugfix**: Updated the editor to fix a serialisation bug

## 0.4.1 (13.09.2019)

* **New**: Enabled italic main text

## 0.4.0 (11.09.2019)

* **New**: Enable cross-references between individual annotations
* **New**: Enable references to the global comment
* **Update**: Updated localisation to bring in line with the deployed site

## 0.3.2 (29.08.2019)

* **Bugfix**: Fix a bug caused by no recent commit message

## 0.3.1 (24.05.2019)

* **Update**: Enabled explicit markup of sources
* **Bugfix**: Made the recognition of updatable commits a bit more robust
* **Bugfix**: Typo in the login form

## 0.3.0 (10.05.2019)

* **New**: Full localisation of the interface for English and German
* **Bugfix**: Don't show the loading indicator when opening the help page
* **Bugfix**: Fixed loading some change messages

## 0.2.0 (08.05.2019)

* **Update**: Improved the user experience

## 0.1.0 (07.05.2019)

* **New**: Initial release

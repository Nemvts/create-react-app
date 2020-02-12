###Naming conventions

- Folder names

  Folders names should be **lowercase** and **kabob-case** (e.g. really-long-folder-name-example)

- File Names

  File names should be **lowercase** and **kabob-case** and should have the appropriate extension for the type of file (see file types)

###File Types

- \<component-name\>.container.js

  These files represent the **container** or **smart** components. They are _connected_ to the redux store.
  These files import actions creatator functions exported by the **usecase** files and provide data and bound actions to child view components.
  Usually these will be placed next to the **component** that they are wrapping.
  The **container** is the **default** export. This is the exception to the rule that we always use named exports for all files.

- \<component-name\>.component.js

  These files are **view** or **dumb** components. They must be passed data and actions. They render dom and present a view. These should be highly reusable.  
  When possible, **stateless components** should be used. The exception is when a component must maintain view information that can be lost if the user navigates away (e.g. whether a card is expanded or not) which would only clutter the application store.

- \<component-name\>.component.scss

  These files are _component-specific_ **styles**. They should not contain styles affecting more than the component and it's children. They should be imported in the components and used as _css-modules_

- \<name\>.reducer.js

  These files export a reducer for a slice of the redux store. **Reducers** are merged into the _/reducers.js_ file
  explicitly or using the _merge-slice-reducer_ util.

- \<name\>.selectors.js

  These files expose a number or factories to generate **selectors** from the library _reselect_. These are necessary to improve reselect performance.
  Selector files should live near the containers that use them. The exception is for very general selectors used by more than one feature. These should live in a shared folder at the _src_ level.

- \<name\>.usecase.js

  These files contain one redux **usecase** which consist of: **actions types,** **actions creators,** **reduce handlers** and optionally one or more **saga** from redux-saga.
  **Reduce handlers** are added to the **reducer** and the optional watch **sagas** are merged using the _mergeSaga_ util.

- \<name>.spec.js

  These files contain the unit test for a given component (loosely interpretted), may be a container, redux file, or any other piece of application code) unit tests.
  It should live next to the component that it tests. Every component should have a spec file.

###Folder Structure

- Special Folders
  - shared

    Denotes application code that is shared across a certain scope of the application. The shared folder location indicates the scope. Any _sibling_ directory of shared and it's subdirectories may use code in the shared folder.

    This folder contains shared items such as selectors, redux files, broadly used ui components (e.g. material-ui wrappers), or higher order components used in multiple places.
- Folder nesting

  Folders should not be nested more than necessary. This generally mean that files should be left in the same folder and not in a subfolder unless there are too many (more than approx. 7) files in one folder.
  Because of the amount of files for a container component, it is likely that all container components will have a new subfolder.

  ```
  src
  |
  |___feature-a
  |   |
  |   |___feature-a-page (matches component name)
  |   |   |
  |   |   |___usecases
  |   |   |   |
  |   |   |   |___fetch-feature-a.usecase.js
  |   |   |   |
  |   |   |   |___fetch-feature-a.usecase.spec.js
  |   |   |   |
  |   |   |   |___save-feature-a.usecase.js
  |   |   |   |
  |   |   |   |___save-feature-a.usecase.spec.js
  |   |   |
  |   |   |__sub-components...
  |   |   |   |___ same pattern as feature-a-page...
  |   |   |
  |   |   |___feature-a-page.container.js
  |   |   |
  |   |   |___feature-a-page.component.js
  |   |   |
  |   |   |___feature-a-page.component.spec.js
  |   |   |
  |   |   |___feature-a-page.component.scss
  |   |
  |   |___feature-a-page-2...
  |   |   |___ same pattern as feature-a-page...
  |   |
  |   |___shared
  |   |   |___ more files...
  |   |
  |   |___feature-a.reducer.js (slice reducer)
  |   |
  |   |___feature-a.reducer.spec.js
  |   |
  |   |___feature-a.selectors.js
  |   |
  |   |___feature-a.selectors.spec.js
  |
  |___feature-b...
  |   |___ same pattern as feature-a...
  |
  |___shared
  |   |___ more files...
  |   |
  |   |___current-user
  |   |   |
  |   |   |___usecases
  |   |   |   |
  |   |   |   |___load-user.usecase.js
  |   |   |   |
  |   |   |   |___load-user.usecase.spec.js
  |   |   |
  |   |   |___current-user.reducer.js
  |   |   |
  |   |   |___current-user.reducer.spec.js
  |   |   |
  |   |   |___current-user.selectors.js
  |   |   |
  |   |   |___current-user.selectors.spec.js

  ```

# Web.App.ReactTemplate v2.0

The DealerSocket template for React Applications

This new version was bootstrapped with [Create React App v 2.0](https://github.com/facebook/create-react-app).

### Features from create-react-app

- babel 7
- eslint
- react
- jest (run unit tests)
- webpack 4 (tree shake and build optimized production bundles)
- webpack-dev-server (dev environment with HMR)

### Features Added

- @dealersocket/ds-ui-react
- @dealersocket/react-common
- axios
- normalizr (normalises redux store data)
- react-component-queries
- react-dnd
- react-intl (localisation)
- react-router (with route based code splitting)
- react-sizeme
- redux (app state manager with time-travel debug)
- redux-form
- redux-saga (task runner for async business logic)
- reselect (memoize selectors used in mapStateToProps)

### DEV Features Added

- @dealersocket/eslint-config-ds-react-flow (our eslint config based on airbnb)
- @dealersocket/package-linter
- @storybook v4 (interactively develop components)
- axios-mock-adapter (mock apis)
- babel-plugin-flow-react-proptypes (generate prop types form flow types)
- chokidar (file watch)
- enzyme (unit test)
- flow-bin
- flow-typed
- plop (code generator)
- postcss
- pipeline: lint, test, build, package and deploy to octopus
- prettier (code formatting)

## Requirement

- node js 8.x https://nodejs.org/en/
- yarn 1.12.x

Install Yarn:

The recommended way to install yarn is via an installer: [Installer](https://yarnpkg.com/lang/en/docs/install/#windows-tab)

## Available Scripts

In the project directory, you can run:

### `yarn` or `yarn install`

Installs node modules defined in package.json

### `yarn start` or `yarn dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

For Mock mode use [http://localhost:3000/?mock=1#](http://localhost:3000/?mock=1#)

The page will reload if you make edits.<br>
You will also see any lint errors in the console.
once this issue is fixed: https://github.com/webpack-contrib/eslint-loader/issues/257

### `yarn lint`

Lints all the code independently of the dev server.

### `yarn lint --fix` or `yarn lint:fix`

Lints and fixes all fixable errors

### `yarn lint-watch`

Lints changed files as they are modified.

### `yarn flow`

Checks all code for FlowType errors

### `yarn flow-watch`

Watch code changes and re-checks for FlowType errors

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn test --watchAll` or `yarn test-all`

Tests and watches all files (not just the changed ones)

### `yarn test --coverage` or `yarn test-coverage`

Tests and generates code coverage report

### `yarn test-coverage-watch`

Watch code changes and re-generates code coverage report

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn prod`

Runs the app in the production mode out of the build folder.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn storybook`

Runs storybook

### `yarn dsui-link`

link to local ds-ui-react build folder

### `yarn dsui-unlink`

unlink from local ds-ui-react build folder

## Creating a new Project

1. Request a Git Repo [PROJECT_NAME].
1. git clone [USER_NAME]@bitbucket.org:dealersocket/[PROJECT_NAME].git
1. git clone [USER_NAME]@bitbucket.org:dealersocket/web.app.reacttemplate.git
1. cd web.app.reacttemplate
1. yarn install
1. yarn run delete-git-and-all-areas
1. in "package.json" rename project name, description and repository url accordingly
1. remove normalizr, react-dnd, react-dnd-html5-backend,
1. in "index.js" set APP_ID accordingly,
1. in all files rename 'Web.App.ReactTemplate' accordingly
1. in all files rename 'web.app.reacttemplate' accordingly
1. in all files rename 'ReactTemplate' accordingly
1. in "bitbucket-pipelines.yml" comment 2 'ds-octopus-create-release' lines
1. Edit README.md (remove sections)
1. OPTIONAL: "yarn run dev" and navigate to "http://localhost:3000/?mock=1" to make sure everything works just fine
1. copy everything but "yarn.lock", "node_modules", ".idea" folders into your project folder
1. cd ../[PROJECT_NAME]
1. If you're on Windows, the executable file attribute gets removed when copying pre-install.sh, to fix:
   1. `git config core.filemode true`
   1. `git update-index --chmod=+x ./scripts/pre-install.sh`
      1. Git for windows will say there are changes for pre-install.sh, DO NOT ADD THEM. It will remove the executable file attribute
   1. `git config core.filemode false`
1. git add .
1. git commit -m "Initial commit"
1. git push
1. check Bitbucket for master to build successfully
1. yarn install
1. Happy Coding!

## Builds in Nightly

Successful pipeline builds are automatically deployed to nightly CDN.

#### Latest

[https://cdn-nightly.dealersocket.engineering/web.app.reacttemplate/index.html?mock=1#](https://cdn-nightly.dealersocket.engineering/web.app.reacttemplate/index.html?mock=1#)

#### Specific version (1.1.986)

[https://cdn-nightly.dealersocket.engineering/web.app.reacttemplate/1.1.986/index.html?mock=1#/](https://cdn-nightly.dealersocket.engineering/web.app.reacttemplate/1.1.986/index.html?mock=1#/)

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

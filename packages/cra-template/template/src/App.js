// @flow
import { create as createAxios } from 'axios';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { createHashHistory } from 'history';
import {
  axiosHelper,
  getHistory,
  isMock,
  lifecycle,
  LifecycleProvider,
  setAppSettings,
  setHistory,
} from '@dealersocket/react-common';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

import { theme } from '@dealersocket/ds-ui-react/theme';
import { ThemeProvider } from '@dealersocket/ds-ui-react/theme/ThemeProvider';
import { configureStore } from './configure-store';
import { AppRoot } from './shared/app-root/app-root';
import './index.scss';
import { translationMessages } from './shared/i18n';

// Import Language Provider
import { LanguageProvider } from './shared/language/language-provider/language-provider';

export function main(appId: string, appSettings: any) {
  setAppSettings(appSettings);
  const appAxios = createAxios();
  axiosHelper.setAxios(appAxios);

  // inject helpers, are available to all logic
  // const injectedHelpers = {
  //   appSettings,
  //   axiosApi: axiosHelper.axiosApi,
  //   axiosJson: axiosHelper.axiosJson,
  // };

  // Uncomment condition to exclude mock from the production build
  // if (process.env.NODE_ENV === 'development') {
  if (isMock) {
    // Use mock data
    require('./app.mock').mock(appAxios); // eslint-disable-line global-require
  }
  // }

  const afterLogin = (user, returnHash) => {
    getHistory().replace(returnHash || '/');
  };

  // lifecycle.init must be called before before the hashHistory is created.
  // redux-oidc was designed to work with browserHistory and not with hashHistory.
  // Therefore lifecycle.init intercepts the hash route '#id_token' before the hashHistory is created.
  // Once created the hash will change to '#/id_token' which could not be processed by the userManager.
  lifecycle.init({ appSettings, afterLogin });

  const history = setHistory(createHashHistory());

  // Create redux store with history
  const initialState: any = {};
  // const store: any = configureStore(initialState, history, injectedHelpers);
  const store: any = configureStore(initialState, history);

  const MOUNT_NODE = document.getElementById('root');
  if (!MOUNT_NODE) {
    return;
  }

  const render = () => {
    ReactDOM.render(
      <Provider store={store}>
        <LifecycleProvider appId={appId} appSettings={appSettings}>
          <ThemeProvider theme={theme}>
            <LanguageProvider messages={translationMessages}>
              <ConnectedRouter history={history}>
                <AppRoot />
              </ConnectedRouter>
            </LanguageProvider>
          </ThemeProvider>
        </LifecycleProvider>
      </Provider>,
      MOUNT_NODE
    );
  };

  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept('./shared/app-root/app-root', () => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render();
      });
    }
  }

  render();
}

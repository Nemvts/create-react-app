// @flow
/**
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */
// import Helmet from 'react-helmet';
import React from 'react';
import ReduxToastr from 'react-redux-toastr';

import { AppHeaderContainer } from './app-header/app-header.container';
import { Routes } from '../../routes';

const rootStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100%',
};

export function AppRoot() {
  return (
    <div style={rootStyle}>
      <AppHeaderContainer />
      <Routes />
      <ReduxToastr
        timeOut={2000}
        transitionIn="fadeIn"
        transitionOut="fadeOut"
      />
    </div>
  );
}

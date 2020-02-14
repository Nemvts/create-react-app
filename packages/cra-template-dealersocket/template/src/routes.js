// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { lazyRender } from '@dealersocket/react-common';

import { HomePageContainer } from 'area/home/home-page/home-page.container';
import AuthenticatingPage from 'area/authentication/authenticating-page';
import { NotFoundPage } from 'area/not-found/not-found-page';

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomePageContainer} />

    <Route
      exact
      path="/secure"
      component={lazyRender(
        () => import('area/authentication/secure-page/secure-page.container'),
        'SecurePageContainer'
      )}
    />

    <Route path="/id_token=*" component={AuthenticatingPage} />

    <Route path="" component={NotFoundPage} />
  </Switch>
);

// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { lazyRender } from '@dealersocket/react-common';

import { HomePageContainer } from 'area/home/home-page/home-page.container';
import { AuthenticatingPage } from 'area/authentication/authenticating-page';
import { NotFoundPage } from 'area/not-found/not-found-page';

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomePageContainer} />

    <Route
      exact
      path="/usage"
      component={lazyRender(
        () => import('area/usage/view/usage-page.container'),
        'UsagePageContainer'
      )}
    />
    <Route
      exact
      path="/dallas"
      component={lazyRender(
        () => import('area/dallas-class/view/students-page.container'),
        'StudentsPageContainer'
      )}
    />
    <Route
      exact
      path="/training"
      component={lazyRender(
        () => import('area/training/training-page/training-page.container'),
        'TrainingPageContainer'
      )}
    />
    <Route
      exact
      path="/training/:id"
      component={lazyRender(
        () => import('area/training/training-page/training-page.container'),
        'TrainingPageContainer'
      )}
    />
    <Route
      exact
      path="/explorer"
      component={lazyRender(
        () =>
          import('area/github-explorer/explorer-page/explorer-page.container'),
        'ExplorerPageContainer'
      )}
    />
    <Route
      exact
      path="/courses"
      component={lazyRender(
        () => import('area/course/courses-page/courses-page.container'),
        'CoursesPageContainer'
      )}
    />
    <Route
      exact
      path="/course"
      component={lazyRender(
        () => import('area/course/course-page/course-page.container'),
        'CoursePageContainer'
      )}
    />
    <Route
      exact
      path="/course/:id"
      component={lazyRender(
        () => import('area/course/course-page/course-page.container'),
        'CoursePageContainer'
      )}
    />
    <Route
      exact
      path="/dnd-demo"
      component={lazyRender(
        () => import('area/dnd-demo/dnd-demo.container'),
        'DndDemoContainer'
      )}
    />
    <Route
      exact
      path="/andrea"
      component={lazyRender(
        () =>
          import('area/playground/andrea/andrea-page/andrea-page.container'),
        'AndreaPageContainer'
      )}
    />
    <Route
      exact
      path="/todo"
      component={lazyRender(
        () => import('area/playground/leo/todo-page/todo-page.container'),
        'TodoPageContainer'
      )}
    />
    <Route
      exact
      path="/todo/:id"
      component={lazyRender(
        () => import('area/playground/leo/todo-page/todo-page.container'),
        'TodoPageContainer'
      )}
    />
    <Route
      exact
      path="/my"
      component={lazyRender(() => import('area/playground/my/view'), 'MyPage')}
    />
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

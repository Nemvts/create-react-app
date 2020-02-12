// @flow
import { createSelector } from 'reselect';

// sliceName defined by 'connected-react-router'
const SLICE_NAME = 'router';

let prevRouterSlice;

const routerSliceSelector = (state: any) => {
  const routerSlice = state[SLICE_NAME];

  if (routerSlice !== prevRouterSlice) {
    prevRouterSlice = routerSlice;
  }

  return prevRouterSlice;
};

export const pathnameSelector = createSelector(
  routerSliceSelector,
  routerSlice => routerSlice.location.pathname
);

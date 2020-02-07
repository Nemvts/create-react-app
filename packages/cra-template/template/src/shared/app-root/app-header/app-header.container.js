// @flow
import { connect } from 'react-redux';
import { titleSelector } from 'shared/nav/nav.selectors';
import { pathnameSelector } from '../../../router.selectors';
import { AppHeader } from './app-header';

function mapStateToProps(state) {
  const pathname = pathnameSelector(state);
  const inMenu =
    [
      '/',
      '/dallas',
      '/training',
      '/usage',
      '/explorer',
      '/courses',
      '/dnd-demo',
      '/my',
      '/andrea',
    ].indexOf(pathname) !== -1 || pathname.indexOf('/training/') !== -1;
  return {
    pathname,
    inMenu,
    title: titleSelector(state),
  };
}

export const AppHeaderContainer = connect(mapStateToProps)(AppHeader);

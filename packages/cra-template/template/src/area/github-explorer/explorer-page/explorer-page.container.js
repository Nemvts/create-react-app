// @flow
import { connect } from 'react-redux';
import { setNavTitleAction } from 'shared/nav/set-title.usecase';

import { usernameSelector } from 'area/user/user.selectors';
import { changeUsernameAction } from 'area/user/usecases/change-username.usecase';

import { ExplorerPage } from './explorer-page';
import {
  reposSelector,
  errorSelector,
  loadingSelector,
} from '../explorer.selectors';
import { loadReposAction } from './usecases/load-repos.usecase';

function mapStateToProps(state) {
  return {
    repos: reposSelector(state),
    username: usernameSelector(state),
    loading: loadingSelector(state),
    error: errorSelector(state),
  };
}

const mapDispatchToProps = {
  setNavTitleAction,
  changeUsernameAction,
  loadReposAction,
};

export const ExplorerPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExplorerPage);

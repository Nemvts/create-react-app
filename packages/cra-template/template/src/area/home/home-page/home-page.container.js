// @flow
import { connect } from 'react-redux';
import { setNavTitleAction } from 'shared/nav/set-title.usecase';
import {
  accessTokenSelector,
  dealershipIdSelector,
  releasePoolSelector,
} from '@dealersocket/react-common';
import { HomePage } from './home-page';

function mapStateToProps(state) {
  return {
    accessToken: accessTokenSelector(state),
    dealershipId: dealershipIdSelector(state),
    releasePool: releasePoolSelector(state),
  };
}

const mapDispatchToProps = {
  setNavTitleAction,
};

export const HomePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);

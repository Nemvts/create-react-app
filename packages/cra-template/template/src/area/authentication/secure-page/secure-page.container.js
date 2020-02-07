// @flow
import { connect } from 'react-redux';
import { setNavTitleAction } from 'shared/nav/set-title.usecase';
import { SecurePage } from './secure-page';

function mapStateToProps(state) {
  return {
    user: state.oidc.user,
  };
}

const mapDispatchToProps = {
  setNavTitleAction,
};

export const SecurePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SecurePage);

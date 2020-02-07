// @flow
import { connect } from 'react-redux';
import { setNavTitleAction } from 'shared/nav/set-title.usecase';

import { AndreaPage } from './andrea-page';
import { calculationsSelector } from '../andrea.selectors';
import { computeSomethingAction } from './usecases/compute-something.usecase';

function mapStateToProps(state) {
  return {
    calculations: calculationsSelector(state),
  };
}

const mapDispatchToProps = {
  setNavTitleAction,
  computeSomethingAction,
};

export const AndreaPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AndreaPage);

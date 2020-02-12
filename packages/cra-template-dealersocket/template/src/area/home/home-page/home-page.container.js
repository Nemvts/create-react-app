// @flow
import { connect } from 'react-redux';
import { setNavTitleAction } from 'shared/nav/set-title.usecase';
import { HomePage } from './home-page';

const mapDispatchToProps = {
  setNavTitleAction,
};

export const HomePageContainer = connect(null, mapDispatchToProps)(HomePage);

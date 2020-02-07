// @flow
import { connect } from 'react-redux';
import { MyPageComponent } from './my-page.component';
import { valueSelector } from '../slice/my.selectors';
import { setValueAction } from '../slice/usecases/set-value.usecase';

function mapStateToProps(state: any) {
  return {
    value: valueSelector(state),
  };
}

const mapDispatchToProps = {
  setValueAction,
};

export const MyPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPageComponent);

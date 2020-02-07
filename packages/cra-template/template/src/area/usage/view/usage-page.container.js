// @flow
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withSize } from 'react-sizeme';
import withLifecycle from '@hocs/with-lifecycle';
import { setNavTitleAction } from 'shared/nav/set-title.usecase';
import { UsagePage } from './usage-page.component';
import { dateSelector } from '../slice/selectors/usage.selectors';

function mapStateToProps(state: any) {
  return {
    date: dateSelector(state),
  };
}

const mapDispatchToProps = {
  setNavTitleAction,
};

export const UsagePageContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withLifecycle({
    onDidMount: (props: any) => {
      const dateStr = props.date.toLocaleDateString();
      props.setNavTitleAction(`Components Usage on ${dateStr}`);
    },
  }),
  withSize()
)(UsagePage);

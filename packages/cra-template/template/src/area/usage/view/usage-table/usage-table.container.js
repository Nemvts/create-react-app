// @flow
import { connect } from 'react-redux';
import { UsageTable } from './usage-table.component';
import {
  criteriaComponentSelector,
  criteriaFromSelector,
  criteriaRepoSelector,
  foundCompsSelector,
  orderSelector,
  orderBySelector,
  reposSelector,
  selectedCompKeySelector,
} from '../../slice/selectors/usage.selectors';
import { selectCompAction } from '../../slice/actions/select-comp.action';
import { setCriteriaComponentAction } from '../../slice/actions/set-criteria-component';
import { setCriteriaFromAction } from '../../slice/actions/set-criteria-from';
import { setCriteriaRepoAction } from '../../slice/actions/set-criteria-repo';
import { setOrderByAction } from '../../slice/actions/set-order-by';

function mapStateToProps(state: any) {
  return {
    criteriaComponent: criteriaComponentSelector(state),
    criteriaFrom: criteriaFromSelector(state),
    criteriaRepo: criteriaRepoSelector(state),
    comps: foundCompsSelector(state),
    order: orderSelector(state),
    orderBy: orderBySelector(state),
    repos: reposSelector(state),
    selectedCompKey: selectedCompKeySelector(state),
  };
}

const mapDispatchToProps = {
  selectCompAction,
  setCriteriaComponentAction,
  setCriteriaFromAction,
  setCriteriaRepoAction,
  setOrderByAction,
};

export const UsageTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsageTable);

export const testPort = {
  mapStateToProps,
};

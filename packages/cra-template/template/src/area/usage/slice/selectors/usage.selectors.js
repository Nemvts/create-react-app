// @flow
import { createSelector } from 'reselect';
import { usageReducer } from '../usage.reducer';

const sliceSelector = state => state[usageReducer.sliceName];

export const dateSelector = createSelector(
  sliceSelector,
  slice => new Date(slice.dateIso)
);

const compsMapSelector = createSelector(sliceSelector, slice => slice.compsMap);

const compsSelector = createSelector(sliceSelector, slice => slice.comps);

export const reposSelector = createSelector(
  sliceSelector,
  slice => slice.repos
);

export const selectedCompKeySelector = createSelector(
  sliceSelector,
  slice => slice.selectedCompKey
);

export const selectedCompSelector = createSelector(
  compsMapSelector,
  selectedCompKeySelector,
  (compsMap, selectedCompKey) => compsMap[selectedCompKey]
);

export const criteriaComponentSelector = createSelector(
  sliceSelector,
  slice => slice.criteriaComponent
);

export const criteriaFromSelector = createSelector(
  sliceSelector,
  slice => slice.criteriaFrom
);

export const criteriaRepoSelector = createSelector(
  sliceSelector,
  slice => slice.criteriaRepo
);

export const criteriaRepoNameSelector = createSelector(
  criteriaRepoSelector,
  reposSelector,
  (criteriaRepo, repos) => {
    if (criteriaRepo === 'ALL') {
      return criteriaRepo;
    }
    const repo = repos.find(r => r.code === criteriaRepo);
    return repo ? repo.name : '';
  }
);

export const orderSelector = createSelector(
  sliceSelector,
  slice => slice.order
);

export const orderBySelector = createSelector(
  sliceSelector,
  slice => slice.orderBy
);

export const sortedCompsSelector = createSelector(
  compsSelector,
  orderSelector,
  orderBySelector,
  (comps, order, orderBy) => {
    if (!comps) {
      return comps;
    }
    return stableSort(comps, getSorting(order, orderBy));
  }
);

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

function desc(a, b, orderBy) {
  const aValue = a[orderBy];
  const bValue = b[orderBy];
  if (bValue < aValue) {
    return -1;
  }
  if (bValue > aValue) {
    return 1;
  }
  return 0;
}

export const foundCompsSelector = createSelector(
  sortedCompsSelector,
  criteriaComponentSelector,
  criteriaFromSelector,
  criteriaRepoSelector,
  (comps, criteriaComponent, criteriaFrom, criteriaRepo) => {
    if (
      (!criteriaComponent && !criteriaFrom && criteriaRepo === 'ALL') ||
      !comps
    ) {
      return comps;
    }
    const componentMatcher = parseCriteria(criteriaComponent);
    const fromMatcher = parseCriteria(criteriaFrom);

    return comps.filter(comp =>
      isCompMatch(comp, componentMatcher, fromMatcher, criteriaRepo)
    );
  }
);

function isCompMatch(
  comp: any,
  componentMatcher,
  fromMatcher,
  criteriaRepo: string
) {
  return (
    isRepoMatch(comp.usageStr, criteriaRepo) &&
    fromMatcher(comp.location) &&
    componentMatcher(comp.component)
  );
}

function parseCriteria(expression: string) {
  const parts = expression.toLocaleLowerCase().split(' ');
  const terms = [];
  parts.forEach(part => {
    let exclude = false;
    let exact = false;
    let term = part.trim();
    if (term) {
      if (term.charAt(0) === '+') {
        term = term.substr(1);
      }
      if (term.charAt(0) === '-') {
        exclude = true;
        term = term.substr(1);
      }
      if (term.charAt(term.length - 1) === '"') {
        exact = true;
      }
      term = term.replace(new RegExp('"', 'g'), '');
      if (term) {
        terms.push({
          exact,
          exclude,
          term,
        });
      }
    }
  });

  const matcher = (value: string): boolean => {
    if (terms.length === 0) return true;
    if (!value) return false;
    const lowValue = value.toLowerCase();
    let includes = 0;
    let excludes = 0;
    for (const term of terms) {
      const isMatch = term.exact
        ? term.term === lowValue
        : lowValue.indexOf(term.term) !== -1;
      if (isMatch) {
        if (term.exclude) {
          excludes += 1;
        } else {
          includes += 1;
        }
      }
    }
    return includes > 0 && excludes === 0;
  };
  return matcher;
}

function isRepoMatch(usageStr: string, criteriaRepo: string) {
  if (criteriaRepo === 'ALL') {
    return true;
  }
  return usageStr.indexOf(`-${criteriaRepo} `) !== -1;
}

// @flow
import { createAndMergeSliceReducer } from '@dealersocket/react-common';
import compsMap from '../data/report-comps-map.json';
import reposInfo from '../data/report-repos-info.json';

export const sliceName = 'usageSlice';

export type UsageSliceType = {
  comps: any[],
  compsMap: any,
  criteriaComponent: string,
  criteriaFrom: string,
  criteriaRepo: string,
  dateIso: string,
  order: string,
  orderBy: string,
  repos: any[],
  selectedCompKey: string,
};

const initialState: UsageSliceType = {
  compsMap,
  comps: getComps(),
  criteriaComponent: '',
  criteriaFrom: '',
  criteriaRepo: 'ALL',
  dateIso: reposInfo.date,
  order: 'asc',
  orderBy: 'component',
  repos: getRepos(),
  selectedCompKey: '',
};

export const usageReducer = createAndMergeSliceReducer(sliceName, initialState);

function getComps() {
  const keys = Object.keys(compsMap);
  return keys.map(key => {
    const comp = compsMap[key];
    return {
      key,
      ...comp,
    };
  });
}

function getRepos() {
  const { repos } = reposInfo;
  const allRepo = {
    code: 'ALL',
    name: `${repos.length} Repositories`,
  };
  return [allRepo].concat(repos);
}

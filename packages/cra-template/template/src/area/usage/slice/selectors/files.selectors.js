// @flow
import { createSelector } from 'reselect';
import {
  selectedCompSelector,
  criteriaRepoNameSelector,
} from './usage.selectors';

const isTestRegEx = /(\.test\.)|(\.spec\.)/;

export const filesSelector = createSelector(
  selectedCompSelector,
  selectedComp => (selectedComp ? massageFiles(selectedComp.files) : [])
);

export const foundFilesSelector = createSelector(
  filesSelector,
  criteriaRepoNameSelector,
  (files, criteriaRepoName) => {
    if (criteriaRepoName === 'ALL' || !files) {
      return files;
    }
    return files.filter(fileInfo => fileInfo.repo === criteriaRepoName);
  }
);

export const filesLabelSelector = createSelector(
  selectedCompSelector,
  foundFilesSelector,
  (selectedComp, files) => {
    let tests = 0;
    if (!selectedComp) {
      return 'files';
    }
    files.forEach(info => {
      if (isTestRegEx.test(info.file)) {
        tests += 1;
      }
    });

    return `files (${files.length - tests} + ${tests} tests)`;
  }
);

function massageFiles(files) {
  if (!files) {
    return [];
  }
  return files.map(file => {
    const repoEnd = file.indexOf('/');
    const repo = file.substring(0, repoEnd);
    const name = file.substring(repoEnd + 1);
    const href = `https://bitbucket.org/dealersocket/${repo}/src/master/${name}`;
    const type = isTestRegEx.test(file) ? 'test' : 'code';
    return {
      file,
      href,
      repo,
      name,
      type,
    };
  });
}

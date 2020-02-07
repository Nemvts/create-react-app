// @flow
import { axiosResult } from '@dealersocket/react-common';
import globToRe from 'glob-to-regexp';
import repos from './github-repos.data.json';

export function mockApi(axiosMock: any) {
  axiosMock
    .onGet(globToRe('https://api.github.com/users/*/repos'), {
      params: { type: 'all', sort: 'updated' },
    })
    .reply(() => {
      return axiosResult(repos);
    });
}

// @flow
import { axiosResult } from '@dealersocket/react-common';
import list1 from './todo-list-1.json';
import list2 from './todo-list-2.json';

export function mockApi(axiosMock: any) {
  axiosMock
    .onGet('https://ds-apis.net/sandbox/todolists')
    .reply(() => axiosResult([list1, list2]));
}

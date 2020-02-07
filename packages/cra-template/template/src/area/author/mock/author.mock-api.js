// @flow
import { axiosResult } from '@dealersocket/react-common';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const authors = [
  {
    id: 'cory-house',
    firstName: 'Cory',
    lastName: 'House',
  },
  {
    id: 'scott-allen',
    firstName: 'Scott',
    lastName: 'Allen',
  },
  {
    id: 'dan-wahlin',
    firstName: 'Dan',
    lastName: 'Wahlin',
  },
];

export function mockApi(axiosMock: any) {
  axiosMock.onGet('https://ds-apis.net/sandbox/authors').reply(() => {
    return axiosResult(authors);
  });
}

// @flow
import { axiosResult } from '@dealersocket/react-common';
import calculations from './loan-calculations.data.json';

export function mockApi(axiosMock: any) {
  axiosMock.onPost('https://myapis/compute-something').reply(config => {
    console.log('mocking... response for', config); // eslint-disable-line no-console
    return axiosResult(calculations);
  });
}

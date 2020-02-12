// @flow
/* eslint-disable global-require */
export function mock(appAxios: any) {
  const MockAdapter = require('axios-mock-adapter');
  const axiosMock = new MockAdapter(appAxios, { delayResponse: 800 });

  // require('area/{name}/mock/{name}.mock-api').mockApi(axiosMock);

  axiosMock.onAny().passThrough();
}
/* eslint-enable global-require */

// @flow
import { axiosResult } from '@dealersocket/react-common';

export function mockApi(axiosMock: any) {
  axiosMock
    .onPost('https://ds-apis.net/training/quiz/compute')
    .reply(config => {
      // eslint-disable-next-line no-console
      console.log(
        'mocking... response for',
        config.url,
        config.method,
        config.data
      );
      const data = JSON.parse(config.data);
      const { operand1, operand2, operation } = data;
      let result;
      switch (operation) {
        case '+':
          result = operand1 + operand2;
          break;
        case '-':
          result = operand1 - operand2;
          break;
        case '*':
          result = operand1 * operand2;
          break;
        case '/':
          if (operand2 === 0) {
            return axiosResult(null, `Cannot divide by Zero`, 500);
          }
          result = operand1 / operand2;
          break;
        default:
          return axiosResult(null, `Operation ${operation} not supported`, 501);
      }
      return axiosResult({ value: result });
    });
}

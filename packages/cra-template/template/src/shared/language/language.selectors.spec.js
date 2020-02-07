// @flow
import { languageSelector } from './language.selectors';

describe('languageSelector', () => {
  const globalSelector = languageSelector();
  it('should select the global state', () => {
    const globalState = {};
    const mockedState = {
      language: globalState,
    };
    expect(globalSelector(mockedState)).toEqual(globalState);
  });
});

// @flow
import { reducer } from '../../language.reducer';

import { CHANGE_LOCALE, changeLocaleAction } from './change-locale.usecase';

describe('Change Local Redux', () => {
  describe('Change Local Action', () => {
    it('has a type of CHANGE_LOCALE', () => {
      const expected = {
        type: CHANGE_LOCALE,
        payload: 'es',
      };
      expect(changeLocaleAction('es')).toEqual(expected);
    });
  });

  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      locale: 'en',
    });
  });

  it('changes the locale', () => {
    expect(reducer(undefined, { type: CHANGE_LOCALE, payload: 'de' })).toEqual({
      locale: 'de',
    });
  });
});

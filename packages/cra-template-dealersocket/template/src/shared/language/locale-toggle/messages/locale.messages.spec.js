// @flow
import assert from 'assert';
import { getLocaleMessages } from './locale.messages';

describe('getLocaleMessages', () => {
  it('should create i18n messages for all locales', () => {
    const expected = {
      en: {
        id: 'web.app.template.containers.LocaleToggle.en',
        defaultMessage: 'en',
      },
      es: {
        id: 'web.app.template.containers.LocaleToggle.es',
        defaultMessage: 'es',
      },
    };

    const actual = getLocaleMessages(['en', 'es']);

    assert.deepEqual(expected, actual);
  });
});

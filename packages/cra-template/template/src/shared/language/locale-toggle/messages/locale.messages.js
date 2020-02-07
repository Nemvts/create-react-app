// @flow
/*
 * LocaleToggle Messages
 *
 * This contains all the text for the LanguageToggle component.
 */
import { defineMessages } from 'react-intl';
import { appLocales } from '../../../i18n';

export function getLocaleMessages(locales: string[]) {
  return locales.reduce(
    (messages, locale) => ({
      ...messages,
      [locale]: {
        id: `web.app.template.containers.LocaleToggle.${locale}`,
        defaultMessage: `${locale}`,
      },
    }),
    {}
  );
}

export const messages = defineMessages(getLocaleMessages(appLocales));

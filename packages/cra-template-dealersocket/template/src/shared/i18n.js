// @flow
/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */

import enTranslationMessages from './translations/en.json';
import esTranslationMessages from './translations/es.json';
import ptTranslationMessages from './translations/pt.json';

export const DEFAULT_LOCALE: string = 'en';

export const appLocales = ['en', 'es', 'pt'];

export const formatTranslationMessages = (
  locale: string,
  messages: { [string]: string }
) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {};
  return Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key];
    return {
      ...formattedMessages,
      [key]: formattedMessage,
    };
  }, {});
};

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  es: formatTranslationMessages('es', esTranslationMessages),
  pt: formatTranslationMessages('pt', ptTranslationMessages),
};

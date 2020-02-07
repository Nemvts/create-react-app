// @flow
import { createSelector } from 'reselect';

/**
 * Direct selector to the languageToggle state domain
 */
export const languageSelector = () => (state: any) => state.language;

/**
 * Select the language locale
 */
export const localeSelector = () =>
  createSelector(languageSelector(), languageState => languageState.locale);

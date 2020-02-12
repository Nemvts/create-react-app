// @flow
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { changeLocaleAction } from 'shared/language/locale-toggle/usecases/change-locale.usecase';
import { localeSelector } from 'shared/language/language.selectors';

import { LocaleToggle } from './locale-toggle';
import { appLocales } from '../../i18n';
import { messages } from './messages/locale.messages';

const mapStateToProps = createSelector(localeSelector(), locale => ({
  locale,
  appLocales,
  messages,
}));

export const mapDispatchToProps = {
  changeLocaleAction,
};

export const LocaleToggleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LocaleToggle);

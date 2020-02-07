// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import { shallow } from 'enzyme';
import { FormattedMessage, defineMessages } from 'react-intl';

import { configureStore } from '../../../configure-store';
import { LanguageProvider } from './language-provider';
import { translationMessages } from '../../i18n';

describe('<LanguageProvider />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, createHashHistory());
  });

  it('should render the default language messages', () => {
    const messages = defineMessages({
      someMessage: {
        id: 'some.id',
        defaultMessage: 'This is some default message',
      },
    });
    const renderedComponent = shallow(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <FormattedMessage {...messages.someMessage} />
        </LanguageProvider>
      </Provider>
    );
    expect(
      renderedComponent.contains(<FormattedMessage {...messages.someMessage} />)
    ).toEqual(true);
  });
});

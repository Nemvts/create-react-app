// @flow
import { Provider } from 'react-redux';
import { ThemeProvider } from '@dealersocket/ds-ui-react/theme/ThemeProvider';
import { theme } from '@dealersocket/ds-ui-react/theme';
import { createHashHistory } from 'history';
import { shallow } from 'enzyme';
import React from 'react';
import { configureStore } from '../../../configure-store';
import {
  LocaleToggleContainer,
  mapDispatchToProps,
} from './locale-toggle.container';
import { LanguageProvider } from '../language-provider/language-provider';

import { translationMessages } from '../../i18n';

describe('<LocaleToggleContainer />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, createHashHistory());
  });

  it('should render the default language messages', () => {
    const renderedComponent = shallow(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <LanguageProvider messages={translationMessages}>
            <LocaleToggleContainer />
          </LanguageProvider>
        </ThemeProvider>
      </Provider>
    );
    expect(renderedComponent.contains(<LocaleToggleContainer />)).toEqual(true);
  });

  // TODO: Kenny look at this one
  // it('should present the default `en` english language option', () => {
  //   const renderedComponent = mount(
  //     <Provider store={store}>
  //       <MuiThemeProvider muiTheme={styles.dsTheme}>
  //         <LanguageProvider messages={translationMessages}>
  //           <LocaleToggleContainer />
  //         </LanguageProvider>
  //       </MuiThemeProvider>
  //     </Provider>
  //   );
  //   console.log('renderedComponent', renderedComponent);
  //   expect(renderedComponent.contains(<Menu value="en">en</Menu>)).toEqual(true);
  // });

  describe('mapDispatchToProps', () => {
    describe('changeLocaleAction', () => {
      it('should be injected', () => {
        expect(mapDispatchToProps.changeLocaleAction).toBeDefined();
      });
    });
  });
});

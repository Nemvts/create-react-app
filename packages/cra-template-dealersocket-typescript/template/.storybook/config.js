import React from 'react';
import { addDecorator, configure } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';

import { backgroundDecorator } from './background.decorator';
import { theme } from '@dealersocket/ds-ui-react/theme';
import { ThemeProvider } from '@dealersocket/ds-ui-react/theme/ThemeProvider';
import { IntlProvider } from 'react-intl';

const storiesImports = require.context('../src', true, /stories.js/);
function loadStories() {
  storiesImports.keys().forEach(storiesImports);
}

addDecorator(backgroundDecorator);
addDecorator(withKnobs);
addDecorator(withNotes);
addDecorator(story => {
  let content = story();
  return (
    <ThemeProvider theme={theme}>
      <IntlProvider locale="en">{content}</IntlProvider>
    </ThemeProvider>
  );
});
configure(loadStories, module);

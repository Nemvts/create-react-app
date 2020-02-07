// @flow
import { get } from 'axios';
import { main } from './app';

const APP_ID = 'reacttemplate';

get('app.settings.json').then(response => {
  const appSettings = response.data;
  main(APP_ID, Object.freeze(appSettings));
});

// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { TextWithCriteria } from './text-with-criteria.component';

storiesOf('TextWithCriteria', module).add('default', () => {
  return <TextWithCriteria text="Shirish" criteria="iri" />;
});

// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { StudentTableRow } from './student-table-row.component';

const student = {
  id: 1,
  first: 'Andrea',
  last: 'Wyss',
  ide: 'WebStorm',
  language: 'ES+',
};

storiesOf('StudentTableRow', module)
  .add('default', () => {
    return (
      <StudentTableRow
        filterCriteria=""
        isBulkProcessing={false}
        removingStudentIds={[]}
        student={student}
        selectedStudentIds={[]}
        removeStudentAction={action('removeStudentAction')}
        toggleStudentAction={action('toggleStudentAction')}
      />
    );
  })
  .add('selected', () => {
    return (
      <StudentTableRow
        filterCriteria=""
        isBulkProcessing={false}
        removingStudentIds={[]}
        student={student}
        selectedStudentIds={[1]}
        removeStudentAction={action('removeStudentAction')}
        toggleStudentAction={action('toggleStudentAction')}
      />
    );
  })
  .add('removing', () => {
    return (
      <StudentTableRow
        filterCriteria=""
        isBulkProcessing={false}
        removingStudentIds={[1]}
        student={student}
        selectedStudentIds={[]}
        removeStudentAction={action('removeStudentAction')}
        toggleStudentAction={action('toggleStudentAction')}
      />
    );
  });

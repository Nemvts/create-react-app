// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { StudentTable } from './student-table.component';

storiesOf('StudentTable', module).add('default', () => {
  const students = [
    {
      id: 1,
      first: 'Andrea',
      last: 'Wyss',
      ide: 'WebStorm',
      language: 'ES+',
    },
    {
      id: 2,
      first: 'Lenzi',
      last: 'Erickson',
      ide: 'CSS/ES',
      language: 'VSCode',
    },
  ];
  return (
    <StudentTable
      areAllSelected={false}
      filterCriteria=""
      isBulkProcessing={false}
      students={students}
      selectedStudentIds={[1]}
      removingStudentIds={[2]}
      removeStudentAction={action('removeStudentAction')}
      toggleStudentAction={action('toggleStudentAction')}
      toggleStudentsAction={action('toggleStudentsAction')}
    />
  );
});

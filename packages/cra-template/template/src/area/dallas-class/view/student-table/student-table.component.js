// @flow
import React from 'react';
import { Checkbox } from '@dealersocket/ds-ui-react/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { StudentTableRow } from '../student-table-row/student-table-row.component';
import type { StudentType } from '../../dallas-class.types';

type Props = {
  areAllSelected: boolean,
  filterCriteria: string,
  isBulkProcessing: boolean,
  removeStudentAction: (student: StudentType) => void,
  removingStudentIds: number[],
  selectedStudentIds: number[],
  students: ?(StudentType[]),
  toggleStudentAction: (student: StudentType) => void,
  toggleStudentsAction: (students: ?(StudentType[])) => void,
};

export const StudentTable = (props: Props) => {
  const getStudentTableRows = (students: StudentType[]) => {
    return students.map(student => (
      <StudentTableRow
        key={student.id}
        student={student}
        isBulkProcessing={props.isBulkProcessing}
        filterCriteria={props.filterCriteria}
        removingStudentIds={props.removingStudentIds}
        removeStudentAction={props.removeStudentAction}
        selectedStudentIds={props.selectedStudentIds}
        toggleStudentAction={props.toggleStudentAction}
      />
    ));
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Checkbox
              data-e2e="all-checkbox"
              checked={props.areAllSelected}
              onChange={() => {
                props.toggleStudentsAction(props.students);
              }}
            />
          </TableCell>
          <TableCell />
          <TableCell>Name</TableCell>
          <TableCell>Pref. IDE</TableCell>
          <TableCell>Pref. Language</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody data-e2e="studentRows">
        {getStudentTableRows(props.students || [])}
      </TableBody>
    </Table>
  );
};

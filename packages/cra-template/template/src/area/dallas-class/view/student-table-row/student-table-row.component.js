// @flow
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ContactAvatar } from '@dealersocket/ds-ui-react/ContactAvatar';
import { Button } from '@dealersocket/ds-ui-react/Button';
import { Checkbox } from '@dealersocket/ds-ui-react/Checkbox';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { TextWithCriteria } from '../text-with-criteria/text-with-criteria.component';
import type { StudentType } from '../../dallas-class.types';

type Props = {
  filterCriteria: string,
  isBulkProcessing: boolean,
  removeStudentAction: (student: StudentType) => void,
  removingStudentIds: number[],
  selectedStudentIds: number[],
  student: StudentType,
  toggleStudentAction: (student: StudentType) => void,
};

export const StudentTableRow = ({
  isBulkProcessing,
  filterCriteria,
  student,
  selectedStudentIds,
  removingStudentIds,
  removeStudentAction,
  toggleStudentAction,
}: Props) => {
  const criteria = filterCriteria ? filterCriteria.toLowerCase() : '';

  const isSelected = (s: StudentType) => {
    return selectedStudentIds && selectedStudentIds.includes(s.id);
  };

  const isRemoving = (s: StudentType) => {
    return removingStudentIds.includes(s.id);
  };

  return (
    <TableRow data-e2e={`student-row-${student.first}`}>
      <TableCell>
        <Checkbox
          data-e2e="student-checkbox"
          checked={isSelected(student)}
          onChange={() => toggleStudentAction(student)}
        />
      </TableCell>
      <TableCell>
        <ContactAvatar
          data-e2e="contactAvatar"
          initials={`${student.first.charAt(0)}${student.last.charAt(0)}`}
          size="small"
          src={student.photo}
        />
      </TableCell>
      <TableCell>
        <TextWithCriteria
          criteria={criteria}
          text={`${student.first} ${student.last}`}
        />
      </TableCell>
      <TableCell>
        <TextWithCriteria criteria={criteria} text={student.ide} />
      </TableCell>
      <TableCell>
        <TextWithCriteria criteria={criteria} text={student.language} />
      </TableCell>
      <TableCell>
        <Button
          data-e2e={`student_remove.${student.id}`}
          color="danger"
          disabled={isBulkProcessing || isRemoving(student)}
          onClick={() => removeStudentAction(student)}
        >
          <FormattedMessage
            id="student-table-row.label.remove"
            defaultMessage="Remove"
          />
        </Button>
      </TableCell>
    </TableRow>
  );
};

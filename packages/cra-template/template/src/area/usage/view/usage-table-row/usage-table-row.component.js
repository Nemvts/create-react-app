// @flow
import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Typography } from '@dealersocket/ds-ui-react/Typography';

type Props = {
  comp: any,
  selectCompAction: (key: string) => void,
  selected: boolean,
};

export const UsageTableRow = ({ comp, selected, selectCompAction }: Props) => {
  return (
    <TableRow onClick={() => selectCompAction(comp.key)} selected={selected}>
      <TableCell>
        <Typography variant="h6">
          {comp.component}
          {comp.inLib ? '' : ' *'}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="h6">{comp.location}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="h6">{comp.usageStr}</Typography>
      </TableCell>
    </TableRow>
  );
};

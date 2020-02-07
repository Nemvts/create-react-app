// @flow
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

type LoanCalculationType = {
  threeSixty: number,
  ['default']: number,
  title: string,
  twoDays: number,
};

export type LoanCalculationsTableComponentProps = {
  calculations: any[],
};

export const LoanCalculationsTable = (
  props: LoanCalculationsTableComponentProps
) => {
  const { calculations } = props;

  const tableRows = calculations.map((calc: LoanCalculationType) => {
    return (
      <TableRow key={`calc-row-${calc.title}`}>
        <TableCell>{calc.title}</TableCell>
        <TableCell>{calc.default}</TableCell>
        <TableCell>{calc.threeSixty}</TableCell>
        <TableCell>{calc.twoDays}</TableCell>
      </TableRow>
    );
  });

  const colHeaderStyle = {
    textAlign: 'left',
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell style={colHeaderStyle}>Title</TableCell>
          <TableCell>Default</TableCell>
          <TableCell>360</TableCell>
          <TableCell>Two Days</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{tableRows}</TableBody>
    </Table>
  );
};

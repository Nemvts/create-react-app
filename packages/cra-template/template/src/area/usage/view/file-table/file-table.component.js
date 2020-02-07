// @flow
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Typography } from '@dealersocket/ds-ui-react/Typography';

type Props = {
  files: any[],
  filesLabel: string,
};

export const FileTable = (props: Props) => {
  const { files, filesLabel } = props;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant="h5">repository</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h5">{filesLabel}</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h5">type</Typography>
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>{getFilesTableRows(files)}</TableBody>
    </Table>
  );
};

const getFilesTableRows = files => {
  return files.map(item => {
    return (
      <TableRow key={item.file}>
        <TableCell>
          <Typography variant="h6">{item.repo}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="h6">
            <a href={item.href} target="_blank" rel="noopener noreferrer">
              {item.name}
            </a>
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="h6">{item.type}</Typography>
        </TableCell>
      </TableRow>
    );
  });
};

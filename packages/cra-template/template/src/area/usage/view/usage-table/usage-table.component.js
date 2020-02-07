// @flow
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableRow from '@material-ui/core/TableRow';
import { TextField } from '@dealersocket/ds-ui-react/fields/TextField';
import { DataSelectField } from '@dealersocket/ds-ui-react/fields/DataSelectField';
import { Typography } from '@dealersocket/ds-ui-react/Typography';
import { UsageTableRow } from '../usage-table-row/usage-table-row.component';

type Props = {
  comps: any[],
  criteriaComponent: string,
  criteriaFrom: string,
  criteriaRepo: string,
  order: string,
  orderBy: string,
  repos: any[],
  selectCompAction: (key: string) => void,
  selectedCompKey: string,
  setCriteriaComponentAction: (value: string) => void,
  setCriteriaFromAction: (value: string) => void,
  setCriteriaRepoAction: (value: string) => void,
  setOrderByAction: (orderBy: string) => void,
};

export const UsageTable = (props: Props) => {
  const {
    comps,
    order,
    orderBy,
    repos,
    selectedCompKey,
    selectCompAction,
    setOrderByAction,
  } = props;

  const cols = [
    { id: 'component', label: `${comps.length} items` },
    { id: 'location', label: ' from' },
    { id: 'usageStr', label: 'usage count by repo' },
  ];

  const getRepoNameByCode = (code): string => {
    const found = repos.find(item => item.code === code);
    return found ? found.name : '';
  };

  const getUsageTableRows = () => {
    return comps.map(comp => {
      const selected = comp.key === selectedCompKey;

      return (
        <UsageTableRow
          key={comp.key}
          comp={comp}
          selected={selected}
          selectCompAction={selectCompAction}
        />
      );
    });
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          {cols.map(col => (
            <TableCell
              key={col.id}
              sortDirection={orderBy === col.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === col.id}
                direction={order}
                onClick={() => setOrderByAction(col.id)}
              >
                <Typography variant="h5">{col.label}</Typography>
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>

        <TableRow>
          <TableCell>
            <TextField
              data-e2e="From"
              fullWidth
              value={props.criteriaComponent}
              onChange={e =>
                props.setCriteriaComponentAction(e.currentTarget.value)
              }
              helperText="minus sign excludes the term. Eg: a -types -props"
            />
          </TableCell>
          <TableCell>
            <TextField
              data-e2e="From"
              fullWidth
              value={props.criteriaFrom}
              onChange={e => props.setCriteriaFromAction(e.target.value)}
              helperText={`double quotes for exact match. Eg: "/" q1`}
            />
          </TableCell>

          <TableCell>
            <DataSelectField
              data-e2e="From"
              fullWidth
              data={repos}
              labelField={item => {
                if (item.code === 'ALL') {
                  return `${item.code}: ${item.name}`;
                }
                return `${item.code} - ${item.name} (using v${item.depVersion})`;
              }}
              valueField="code"
              value={props.criteriaRepo}
              onChange={e => {
                return props.setCriteriaRepoAction(e.target.value);
              }}
              SelectProps={{
                renderValue: value => {
                  return `${value} - ${getRepoNameByCode(value)}`;
                },
              }}
              helperText=" "
            />
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody style={{ height: 200 }}>{getUsageTableRows()}</TableBody>
    </Table>
  );
};

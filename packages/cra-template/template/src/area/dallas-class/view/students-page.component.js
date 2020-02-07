// @flow
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from '@dealersocket/ds-ui-react/Button';
import {
  TypographyVariants,
  Typography,
} from '@dealersocket/ds-ui-react/Typography';
import { TextField } from '@dealersocket/ds-ui-react/fields/TextField';
import { StudentTable } from './student-table';
import type { StudentType } from '../dallas-class.types';

type Props = {
  clearStudentsAction: () => void,
  filterCriteria: string,
  isBulkProcessing: boolean,
  isLoading: boolean,
  isOneSelected: boolean,
  loadStudentsAction: () => void,
  removeSelectedStudentsAction: () => void,
  setFilterCriteriaAction: (value: string) => void,
  students: ?(StudentType[]),
};

export class StudentsPageComp extends React.Component<Props> {
  componentDidMount() {
    this.props.loadStudentsAction();
  }

  render() {
    const {
      filterCriteria,
      isBulkProcessing,
      isLoading,
      isOneSelected,
      students,
      clearStudentsAction,
      loadStudentsAction,
      removeSelectedStudentsAction,
      setFilterCriteriaAction,
    } = this.props;
    return (
      <div>
        <Typography variant={TypographyVariants.H2}>
          <FormattedMessage
            id="students-page.title"
            defaultMessage="Students"
          />
        </Typography>
        <div>
          <TextField
            data-e2e="FilterField"
            value={filterCriteria}
            placeholder="Filter"
            onChange={e => setFilterCriteriaAction(e.target.value)}
          />
          <Button data-e2e="student_clear" onClick={clearStudentsAction}>
            <FormattedMessage
              id="students-page.label.clear"
              defaultMessage="Clear"
            />
          </Button>
          <Button
            data-e2e="student_load"
            disabled={isLoading}
            onClick={loadStudentsAction}
          >
            {isLoading ? (
              <FormattedMessage
                id="students-page.label.loading"
                defaultMessage="Loading..."
              />
            ) : (
              <FormattedMessage
                id="students-page.label.load"
                defaultMessage="Load"
              />
            )}
          </Button>
          {isOneSelected && (
            <Button
              data-e2e="student_remove_selected"
              color="danger"
              disabled={isBulkProcessing}
              onClick={removeSelectedStudentsAction}
            >
              <FormattedMessage
                id="students-page.label.remove_selected"
                defaultMessage="Remove Selected"
              />
            </Button>
          )}
        </div>
        <StudentTable students={students} />
      </div>
    );
  }
}

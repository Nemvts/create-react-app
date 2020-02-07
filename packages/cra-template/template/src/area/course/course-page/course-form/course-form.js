// @flow
import React from 'react';
import type { FormProps } from 'redux-form';
import { ConfirmDialog } from 'shared/dialogs/confirm-dialog';

import { Button } from '@dealersocket/ds-ui-react/Button';
import { FormTextField } from '@dealersocket/ds-ui-react/form/fields/FormTextField';
import { FormDataSelectField } from '@dealersocket/ds-ui-react/form/fields/FormDataSelectField';

const CONFIRM_DELETE_DIALOG = 'CONFIRM_DELETE_DIALOG';

const selectRequired = value => (value !== '' ? undefined : 'Required');
const required = value => (value ? undefined : 'Required');
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

type CourseFormProps = {
  authors: any[],
  handleDelete: () => void,
  initialValues: any,
  openDialogAction: () => void,
};

export const CourseForm = ({
  pristine,
  submitting,
  handleSubmit,
  handleDelete,
  authors,
  openDialogAction,
}: FormProps & CourseFormProps) => {
  return (
    <div>
      <form style={{ padding: 20 }} onSubmit={handleSubmit}>
        <div>
          <FormTextField
            label="Title"
            placeholder="Enter title"
            name="title"
            validate={[required, minLength(3), maxLength(50)]}
          />
        </div>
        <div>
          <FormTextField
            label="Category"
            placeholder="Enter category"
            name="category"
            validate={[required]}
          />
        </div>
        <div>
          <FormTextField
            label="Length"
            placeholder="Enter length"
            name="length"
            validate={[required]}
          />
        </div>
        <div>
          <FormDataSelectField
            name="authorId"
            label="Author"
            labelField="text"
            placeholder="Select an author"
            validate={[selectRequired]}
            data={authors}
          />
        </div>
        <div>
          <Button
            color="primary"
            type="submit"
            disabled={pristine || submitting}
          >
            {'Save'}
          </Button>
          <Button
            color="danger"
            disabled={submitting}
            onClick={event => {
              event.preventDefault();
              openDialogAction(CONFIRM_DELETE_DIALOG);
            }}
          >
            {'Delete'}
          </Button>
        </div>
      </form>
      <ConfirmDialog
        name={CONFIRM_DELETE_DIALOG}
        message="Are you sure you want to delete this course?"
        yesLabel="DELETE"
        yesAction={handleDelete}
      />
    </div>
  );
};

// @flow
import React from 'react';
import { reduxForm } from 'redux-form';
import { Button } from '@dealersocket/ds-ui-react/Button';
import { FormTextField } from '@dealersocket/ds-ui-react/form/fields/FormTextField';

export type LoanCalculationsFormComponentProps = {
  handleSubmit: (data: any) => void,
};

const LoanCalculationsFormComponent = (
  props: LoanCalculationsFormComponentProps
) => {
  const { handleSubmit } = props;

  const formStyle = {
    padding: 20,
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <FormTextField label="Financed Amount" name="financedAmount" />
      <br />
      <FormTextField label="Last" name="last" />
      <br />
      <br />
      <Button type="submit" color="primary">
        Compute
      </Button>
    </form>
  );
};

export const LoanCalculationsForm = reduxForm({
  form: 'andreaForm',
  enableReinitialize: true,
})(LoanCalculationsFormComponent);

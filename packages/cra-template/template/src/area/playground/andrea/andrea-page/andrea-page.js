// @flow
import React from 'react';

import { LoanCalculationsForm } from './loan-calculations-form/loan-calculations-form.component';
import { LoanCalculationsTable } from './loan-calculations-table/loan-calculations-table.component';

export type AndreaPageComponentProps = {
  calculations: ?(any[]),
  computeSomethingAction: (data: any) => void,
  setNavTitleAction: (title: string) => void,
  status: ?string,
};

export class AndreaPage extends React.Component<AndreaPageComponentProps> {
  componentDidMount() {
    this.props.setNavTitleAction("Andrea's Page");
  }

  props: AndreaPageComponentProps;

  render() {
    const { calculations, computeSomethingAction } = this.props;

    return (
      <div>
        <LoanCalculationsForm onSubmit={computeSomethingAction} />

        {calculations && <LoanCalculationsTable calculations={calculations} />}

        <h2>{this.props.status}</h2>
      </div>
    );
  }
}

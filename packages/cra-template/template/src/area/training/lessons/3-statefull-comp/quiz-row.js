// @flow
/* eslint-disable @dealersocket/dealersocket/no-stateful-component */
import React from 'react';
import { NumberField } from '@dealersocket/ds-ui-react/fields/NumberField';
import { Button } from '@dealersocket/ds-ui-react/Button';
import { UsefulLinks } from 'area/training/useful-links/useful-links';

type State = {
  operand1: number,
  operand2: number,
  operation: string,
  result: any,
};

export class QuizRow extends React.Component<any, State> {
  state = {
    operand1: 0,
    operation: '+',
    operand2: 3,
    result: null,
  };

  shouldComponentUpdate(nextProps: any, nextState: any) {
    console.log('Lesson 3 - shouldComponentUpdate', nextProps, nextState); // eslint-disable-line no-console
    return true;
  }

  setOperand1Action = (value: ?number) => {
    const { state } = this;
    this.setState({
      ...state,
      operand1: !value ? 0 : value,
      result: null,
    });
  };

  computeAction = () => {
    const { state } = this;
    const result = state.operand1 + state.operand2;
    this.setState({ result });
  };

  render() {
    const { state } = this;
    const hasResult = Boolean(state.result) && !Number.isNaN(state.result);

    const spanStyle = {
      margin: 4,
    };

    return (
      <div style={{ fontSize: '16px' }}>
        <div>
          <NumberField
            data-e2e=""
            name="operand1"
            value={state.operand1}
            width={40}
            onChange={value => this.setOperand1Action(value)}
          />
          {state.operation}
          <span style={spanStyle}>{state.operand2}</span>
          <Button
            disabled={hasResult}
            onClick={() => this.computeAction()}
            color="primary"
          >
            =
          </Button>
          <span style={spanStyle}>{state.result}</span>
          {hasResult && (
            <Button
              onClick={() => this.setOperand1Action(state.result)}
              color="primary"
            >
              Continue
            </Button>
          )}
        </div>

        <UsefulLinks>
          <br />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.youtube.com/embed/DgVS-zXgMTk?start=1031&end=1141"
          >
            React - Rethinking Best Practices (17:11 - 19:00)
          </a>
        </UsefulLinks>
      </div>
    );
  }
}

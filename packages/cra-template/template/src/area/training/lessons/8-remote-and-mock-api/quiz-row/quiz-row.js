// @flow
import React from 'react';
import { NumberField } from '@dealersocket/ds-ui-react/fields/NumberField';
import { Button } from '@dealersocket/ds-ui-react/Button';
import { UsefulLinks } from 'area/training/useful-links/useful-links';

type QuizRowProps = {
  computeAction: (payload: any) => void,
  isComputing: boolean,
  operand1: number,
  operand2: number,
  operation: string,

  result: any,
  setOperand1Action: (value: ?number) => void,
};

export function QuizRow(props: QuizRowProps) {
  const hasResult = Boolean(props.result) && !Number.isNaN(props.result);

  const spanStyle = {
    padding: 4,
  };

  const { operand1, operand2, operation, isComputing, result } = props;

  const compute = () => {
    const payload = {
      operand1,
      operand2,
      operation,
    };
    props.computeAction(payload);
  };

  return (
    <div style={{ fontSize: '16px' }}>
      <div>
        <NumberField
          data-e2e=""
          name="operand1"
          value={operand1}
          width={40}
          onChange={value => props.setOperand1Action(value)}
        />
        {operation}
        <span style={spanStyle}>{operand2}</span>
        <Button
          disabled={isComputing || hasResult}
          onClick={compute}
          color="primary"
        >
          {isComputing ? '...' : '='}
        </Button>
        <span style={spanStyle}>{result}</span>
        {isComputing && <span>Waiting for API response...</span>}
        {hasResult && (
          <Button
            onClick={() => props.setOperand1Action(result)}
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
          href="https://github.com/axios/axios"
        >
          axios
        </a>
        <br />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/ctimmerm/axios-mock-adapter"
        >
          axios-mock-adapter
        </a>
        <br />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://redux-saga.js.org/"
        >
          redux-saga
        </a>
        <br />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/then/promise"
        >
          promise
        </a>
      </UsefulLinks>
    </div>
  );
}

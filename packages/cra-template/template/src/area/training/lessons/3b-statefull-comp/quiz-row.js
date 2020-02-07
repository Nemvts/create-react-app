// @flow
/* eslint-disable @dealersocket/dealersocket/no-stateful-component */
import React, { useState } from 'react';
import { NumberField } from '@dealersocket/ds-ui-react/fields/NumberField';
import { Button } from '@dealersocket/ds-ui-react/Button';
import { UsefulLinks } from 'area/training/useful-links/useful-links';

export function QuizRow() {
  const [operand1, setOperand1] = useState(0);
  const operation = '+';
  const operand2 = 3;
  const [result, setResult] = useState(null);

  const setOperand1Action = (value: ?number) => {
    setOperand1(!value ? 0 : value);
    setResult(null);
  };

  const computeAction = () => {
    setResult(operand1 + operand2);
  };

  const hasResult = Boolean(result) && !Number.isNaN(result);

  const spanStyle = {
    margin: 4,
  };

  return (
    <div style={{ fontSize: '16px' }}>
      <div>
        <NumberField
          data-e2e=""
          name="operand1"
          value={operand1}
          width={40}
          onChange={value => setOperand1Action(value)}
        />
        {operation}
        <span style={spanStyle}>{operand2}</span>
        <Button
          disabled={hasResult}
          onClick={() => computeAction()}
          color="primary"
        >
          =
        </Button>
        <span style={spanStyle}>{result}</span>
        {hasResult && (
          <Button onClick={() => setOperand1Action(result)} color="primary">
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
        <br />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://reactjs.org/docs/hooks-state.html"
        >
          React - Using the State Hook
        </a>
      </UsefulLinks>
    </div>
  );
}

// @flow
import React from 'react';
import { NumberField } from '@dealersocket/ds-ui-react/fields/NumberField';
import { Button } from '@dealersocket/ds-ui-react/Button';
import { UsefulLinks } from 'area/training/useful-links/useful-links';

type QuizRowProps = {
  operand1: number,
  operand2: number,
  operation: string,
  result: any,

  setOperand1Action: (value: ?number) => void,
};

export function QuizRow(props: QuizRowProps) {
  const spanStyle = {
    margin: 4,
  };

  return (
    <div style={{ fontSize: '16px' }}>
      <div>
        <NumberField
          data-e2e=""
          name="operand1"
          value={props.operand1}
          width={40}
          onChange={value => props.setOperand1Action(value)}
        />
        {props.operation}
        <span style={spanStyle}>{props.operand2}</span>=
        <span style={spanStyle}>{props.result}</span>
        <Button
          onClick={() => props.setOperand1Action(props.result)}
          color="primary"
        >
          Continue
        </Button>
      </div>

      <UsefulLinks>
        <br />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://medium.com/@learnreact/container-components-c0e67432e005#.nil1pv9cj"
        >
          Container Components
        </a>
        <br />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.nbdpbc8dy"
        >
          Presentational and Container Components
        </a>
        <br />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://facebook.github.io/react/docs/higher-order-components.html"
        >
          Higher-Order Components
        </a>
      </UsefulLinks>
    </div>
  );
}

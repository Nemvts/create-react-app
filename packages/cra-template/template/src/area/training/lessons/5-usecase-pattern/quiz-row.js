// @flow
import React from 'react';
import { connect } from 'react-redux';
import { NumberField } from '@dealersocket/ds-ui-react/fields/NumberField';
import { Button } from '@dealersocket/ds-ui-react/Button';

import { UsefulLinks } from 'area/training/useful-links/useful-links';
import { setOperand1Action } from './usecases/set-operand1.usecase';
import { computeAction } from './usecases/compute.usecase';

type QuizRowProps = {
  computeAction: () => void,
  operand1: number,
  operand2: number,
  operation: string,
  result: any,
  setOperand1Action: (value: ?number) => void,
};

function QuizRowComp(props: QuizRowProps) {
  const hasResult = Boolean(props.result) && !Number.isNaN(props.result);

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
        <span style={spanStyle}>{props.operand2}</span>
        <Button
          disabled={hasResult}
          onClick={() => props.computeAction()}
          color="primary"
        >
          =
        </Button>
        <span style={spanStyle}>{props.result}</span>
        {hasResult && (
          <Button
            onClick={() => props.setOperand1Action(props.result)}
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
          href="https://www.youtube.com/embed/DgVS-zXgMTk?start=224&end=310"
        >
          Coupling & Cohesion (3:44 - 5:10)
        </a>
        <br />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://vimeo.com/168648012"
        >
          Scaling React Applications
        </a>
      </UsefulLinks>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    operand1: state.lesson5.operand1,
    operation: state.lesson5.operation,
    operand2: state.lesson5.operand2,
    result: state.lesson5.result,
  };
}

const mapDispatchToProps = {
  computeAction,
  setOperand1Action,
};

export const QuizRowContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizRowComp);

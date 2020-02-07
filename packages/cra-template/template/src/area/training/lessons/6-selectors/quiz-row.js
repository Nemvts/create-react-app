// @flow
import React from 'react';
import { connect } from 'react-redux';
import { NumberField } from '@dealersocket/ds-ui-react/fields/NumberField';
import { Button } from '@dealersocket/ds-ui-react/Button';
import { UsefulLinks } from 'area/training/useful-links/useful-links';
import { setOperand1Action } from './usecases/set-operand1.usecase';
import { lessonSelector, resultSelector } from './lesson6.selectors';

type QuizRowProps = {
  operand1: number,
  operand2: number,
  operation: string,
  result: any,
  setOperand1Action: (value: ?number) => void,
};

function QuizRow(props: QuizRowProps) {
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
          href="https://github.com/reactjs/reselect"
        >
          Reselect
        </a>
      </UsefulLinks>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    ...lessonSelector(state),
    result: resultSelector(state),
  };
}

const mapDispatchToProps = {
  setOperand1Action,
};

export const QuizRowContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizRow);

// @flow
import React from 'react';
import { connect } from 'react-redux';
import { NumberField } from '@dealersocket/ds-ui-react/fields/NumberField';
import { Button } from '@dealersocket/ds-ui-react/Button';

import { UsefulLinks } from 'area/training/useful-links/useful-links';
import { computeAction, setOperand1Action } from './lesson4.actions';
import './lesson4.reducer';

type QuizRowCompProps = {
  computeAction: () => void,
  operand1: number,
  operand2: number,
  operation: string,
  result: any,
  setOperand1Action: (value: ?number) => void,
};

function QuizRowComp(props: QuizRowCompProps) {
  console.log('render', props); // eslint-disable-line no-console

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
          href="http://redux.js.org/docs/introduction/ThreePrinciples.html"
        >
          Redux Three Principles
        </a>
        <br />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://en.wikipedia.org/wiki/Pure_function"
        >
          Pure function
        </a>
        <br />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://guide.elm-lang.org/architecture/"
        >
          The Elm Architecture
        </a>
        <br />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/zalmoxisus/redux-devtools-extension"
        >
          redux-devtools-extension for Chrome and Firefox
        </a>
        <br />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://onsen.io/blog/react-redux-devtools-with-time-travel/"
        >
          Time Travel debugging in IE
        </a>
      </UsefulLinks>
    </div>
  );
}

function mapStateToProps(state) {
  console.log('mapStateToProps'); // eslint-disable-line no-console
  return {
    operand1: state.lesson4.operand1,
    operation: state.lesson4.operation,
    operand2: state.lesson4.operand2,
    result: state.lesson4.result,
  };
}

const mapDispatchToProps = {
  computeAction,
  setOperand1Action,
};

export const QuizRow = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizRowComp);

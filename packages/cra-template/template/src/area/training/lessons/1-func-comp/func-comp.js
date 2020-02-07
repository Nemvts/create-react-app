// @flow
import React from 'react';
import { UsefulLinks } from 'area/training/useful-links/useful-links';

type MyFuncComponentProps = {
  studentName: string,
};

export function MyFuncComponent(props: MyFuncComponentProps) {
  const welcomeMessageConst =
    props.studentName.length > 3 ? (
      <i>{`Welcome ${props.studentName} from const`}</i>
    ) : null;

  function welcomeMessageFunc() {
    return props.studentName.length > 3 ? (
      <i>{`Welcome ${props.studentName} from function`}</i>
    ) : null;
  }

  const welcomeMessageArrowFunc = () => {
    return props.studentName.length > 3 ? (
      <i>{`Welcome ${props.studentName} from arrow function`}</i>
    ) : null;
  };

  return (
    <div style={{ fontSize: '16px' }}>
      <div>
        <span>Your name is: </span>
        {props.studentName}
      </div>
      <br />
      {welcomeMessageConst}
      <br />
      {welcomeMessageFunc()}
      <br />
      {welcomeMessageArrowFunc()}
      <br />
      {props.studentName.length > 3 && (
        <i>{`Welcome ${props.studentName} from inline test`}</i>
      )}
      <br />
      {props.studentName.length > 3 ? (
        <i>{`Welcome ${props.studentName} from inline ternary`}</i>
      ) : null}
      <br />
      <br />
      {'0'} renders: {0}
      <br />
      {'undefined'} renders: {undefined}
      <br />
      {'null'} renders: {null}
      <br />
      {'false'} renders: {false}
      <br />
      {'true'} renders: {true}
      <br />
      <UsefulLinks>
        <br />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://facebook.github.io/react/docs/introducing-jsx.html"
        >
          Introducing JSX
        </a>
        <br />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=es2015%2Creact%2Cstage-2&targets=&browsers=&builtIns=false&code=%3Cdiv%3E%0A%20%20%3Cdiv%3E%3Cspan%3EYour%20name%20is%3A%20%3C%2Fspan%3E%7Bthis.props.studentName%7D%3C%2Fdiv%3E%0A%20%20%3CWelcome%20name%3D%7Bthis.props.studentName%7D%20%2F%3E%0A%0A%20%20%3CUsefulLinks%3E%0A%20%20%20%20%3Cbr%20%2F%3E%3Ca%20href%3D%22https%3A%2F%2Ffacebook.github.io%2Freact%2Fdocs%2Freact-component.html%22%3EReact.Component%3C%2Fa%3E%0A%20%20%20%20%3Cbr%20%2F%3E%3Ca%20href%3D%22https%3A%2F%2Ffacebook.github.io%2Freact%2Fdocs%2Freact-api.html%23react.purecomponent%22%3EReact.PureComponent%3C%2Fa%3E%0A%20%20%20%20%3Cbr%20%2F%3E%3Ca%20href%3D%22https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Freact-developer-tools%2Ffmkadmapgofadopljbjfkapdkoienihi%22%3EChrome%20react-developer-tools%3C%2Fa%3E%0A%20%20%3C%2FUsefulLinks%3E%0A%3C%2Fdiv%3E%0A"
        >
          Babel online playground
        </a>
        <br />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://facebook.github.io/react/docs/components-and-props.html"
        >
          Components and Props
        </a>
        <br />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc#.34ufj49ms"
        >
          Nine Wins You Might Have Overlooked
        </a>
        <br />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://es6-features.org/"
        >
          ES2015 (ES6) Features
        </a>
        <br />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://app.pluralsight.com/library/courses/rapid-es6-training"
        >
          Rapid ES6 Training
        </a>
      </UsefulLinks>
    </div>
  );
}

// @flow
import React from 'react';
import { UsefulLinks } from 'area/training/useful-links/useful-links';

type WelcomeProps = {
  name: string,
};
const Welcome = (props: WelcomeProps) => {
  return props.name.length > 3 ? (
    <i>{`Welcome ${props.name} to this lesson`}</i>
  ) : null;
};

type MyClassComponentProps = {
  studentName: string,
};
export class MyClassComponent extends React.Component<
  MyClassComponentProps,
  any
> {
  static getDerivedStateFromProps(
    nextProps: MyClassComponentProps,
    prevState: any
  ) {
    // eslint-disable-next-line no-console
    console.log(
      'MyClassComponent static getDerivedStateFromProps',
      nextProps,
      prevState
    );
    return null;
  }

  constructor(...args: any) {
    super(...args);
    console.log('MyClassComponent constructor'); // eslint-disable-line no-console
  }

  state = {};

  componentDidMount() {
    console.log('MyClassComponent componentDidMount'); // eslint-disable-line no-console
  }

  shouldComponentUpdate(nextProps: MyClassComponentProps, nextState: any) {
    console.log('MyClassComponent shouldComponentUpdate', nextProps, nextState); // eslint-disable-line no-console
    return true;
  }

  componentDidUpdate(
    prevProps: MyClassComponentProps,
    prevState: any,
    snapshot: any
  ) {
    console.log('MyClassComponent componentDidUpdate', snapshot); // eslint-disable-line no-console
  }

  componentWillUnmount() {
    console.log('MyClassComponent componentWillUnmount'); // eslint-disable-line no-console
  }

  // eslint-disable-next-line class-methods-use-this
  getSnapshotBeforeUpdate(prevProps: MyClassComponentProps, prevState: any) {
    // eslint-disable-next-line no-console
    console.log(
      'MyClassComponent getSnapshotBeforeUpdate',
      prevProps,
      prevState
    );
    const snapshot = { hello: 123 };
    // return null;
    return snapshot;
  }

  props: MyClassComponentProps;

  render() {
    console.log('MyClassComponent render'); // eslint-disable-line no-console
    return (
      <div style={{ fontSize: '16px' }}>
        <div>
          <span>Your name is: </span>
          {this.props.studentName}
        </div>
        <Welcome name={this.props.studentName} />

        <UsefulLinks>
          <br />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://facebook.github.io/react/docs/react-component.html"
          >
            React.Component
          </a>
          <br />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://facebook.github.io/react/docs/react-api.html#react.purecomponent"
          >
            React.PureComponent
          </a>
          <br />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi"
          >
            Chrome react-developer-tools
          </a>
        </UsefulLinks>
      </div>
    );
  }
}

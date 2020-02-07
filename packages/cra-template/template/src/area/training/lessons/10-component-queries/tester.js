// @flow
import React from 'react';
import { NumberField } from '@dealersocket/ds-ui-react/fields/NumberField';
import { UsefulLinks } from 'area/training/useful-links/useful-links';
import { DemoComponentQueries } from './demo-component-queries.component';

type State = {
  largeWidth: ?number,
  smallWidth: ?number,
};

export class Tester extends React.Component<any, State> {
  constructor(...args: any) {
    super(...args);
    this.state = {
      smallWidth: 480,
      largeWidth: 1024,
    };
  }

  state: State;

  render() {
    const { smallWidth, largeWidth } = this.state;

    return (
      <div style={{ fontSize: '16px' }}>
        <div>
          <NumberField
            data-e2e=""
            label={<span>smallWidth</span>}
            name="smallWidth"
            onChange={value => this.setState({ smallWidth: value })}
            value={smallWidth}
            width={100}
          />
          <NumberField
            data-e2e=""
            label={<span>largeWidth</span>}
            name="largeWidth"
            onChange={value => this.setState({ largeWidth: value })}
            value={largeWidth}
            width={100}
          />
        </div>

        <DemoComponentQueries smallWidth={smallWidth} largeWidth={largeWidth} />

        <UsefulLinks />
      </div>
    );
  }
}

// @flow
import React from 'react';
import { getHistory } from '@dealersocket/react-common';
import { Button } from '@dealersocket/ds-ui-react/Button';

type HomePageProps = {
  accessToken: string,
  dealershipId: ?string,
  releasePool: ?string,
  setNavTitleAction: string => void,
};

export class HomePage extends React.PureComponent<HomePageProps> {
  componentDidMount() {
    this.props.setNavTitleAction('Web.App.ReactTemplate');
  }

  props: HomePageProps;

  render() {
    const { dealershipId, releasePool, accessToken } = this.props;

    return (
      <div>
        <div style={{ padding: 20 }}>
          <Button id="training" onClick={() => getHistory().push('/training')}>
            {'Training'}
          </Button>
          <div style={{ width: 20, display: 'inline-block' }} />
          <Button
            id="mypage"
            color="primary"
            onClick={() => getHistory().push('/my')}
          >
            {'My Page'}
          </Button>
        </div>
        <div style={{ padding: 20 }}>
          <div>dealershipId: {dealershipId}</div>
          <div>releasePool: {releasePool}</div>
          <div>accessToken: {accessToken}</div>
        </div>
      </div>
    );
  }
}

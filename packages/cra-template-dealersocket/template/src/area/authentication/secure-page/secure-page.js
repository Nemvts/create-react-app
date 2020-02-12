// @flow
import React from 'react';
import { logout } from '@dealersocket/react-common';
import { Button } from '@dealersocket/ds-ui-react/Button';

type SecurePageProps = {
  user: any,
};

export class SecurePage extends React.PureComponent<SecurePageProps> {
  props: SecurePageProps;

  render() {
    const { user } = this.props;

    return (
      <div>
        <div>{JSON.stringify(user, null, 2)}</div>
        <Button id="logout" color="primary" type="submit" onClick={logout}>
          {'Logout'}
        </Button>
      </div>
    );
  }
}

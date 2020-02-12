// @flow
import React from 'react';

type HomePageProps = {
  setNavTitleAction: string => void,
};

export class HomePage extends React.PureComponent<HomePageProps> {
  constructor(props: HomePageProps) {
    super(props);
    this.props.setNavTitleAction('Web.App.ReactTemplate');
  }

  render() {
    return <div>Home Page</div>;
  }
}

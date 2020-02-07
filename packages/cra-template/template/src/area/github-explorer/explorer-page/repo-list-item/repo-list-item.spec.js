// @flow
/**
 * Test the repo list item
 */

import React from 'react';
import { mountWithProviders } from '@dealersocket/ds-ui-react/test-utils';

import ListItem from '@material-ui/core/ListItem';
import { theme } from '@dealersocket/ds-ui-react/theme';
import { RepoListItem } from './repo-list-item';

const renderComponent = ({ item, ...other }) =>
  mountWithProviders(<RepoListItem item={item} {...other} />, theme);

describe('<RepoListItem />', () => {
  let item;

  // Before each test reset the item data for safety
  beforeEach(() => {
    item = {
      owner: {
        login: 'mxstbr',
      },
      html_url: 'https://github.com/mxstbr/react-boilerplate',
      name: 'react-boilerplate',
      open_issues_count: 20,
      full_name: 'mxstbr/react-boilerplate',
    };
  });

  it('should render a ListItem', () => {
    // const renderedComponent = shallow(
    // wrapping with context for muiTheme
    const renderedComponent = mountWithProviders(
      <RepoListItem item={item} />,
      theme
    );
    expect(renderedComponent.find(ListItem).length).toBe(1);
  });

  it('should not render the current username', () => {
    const renderedComponent = renderComponent({
      item,
      currentUsername: item.owner.login,
    });
    expect(renderedComponent.text()).not.toContain(item.owner.login);
  });

  it('should render usernames that are not the current one', () => {
    const renderedComponent = renderComponent({
      item,
      currentUsername: 'nikgraf',
    });
    expect(renderedComponent.text()).toContain(item.owner.login);
  });

  it('should render the repo name', () => {
    const renderedComponent = renderComponent({ item });
    expect(renderedComponent.text()).toContain(item.name);
  });

  it('should render the issue count', () => {
    const renderedComponent = renderComponent({ item });
    expect(renderedComponent.text()).toContain(item.open_issues_count);
  });

  // it('should render the IssueIcon', () => {
  //   const renderedComponent = renderComponent({ item });
  //   expect(renderedComponent.find('svg').length).toBe(1);
  // });
});

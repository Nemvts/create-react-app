// @flow
/* eslint-disable @dealersocket/dealersocket/no-stateful-component */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import LanguageIcon from '@material-ui/icons/Language';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

type Props = {
  appLocales: string[],
  changeLocaleAction: string => void,
  classes: any,
  locale: string,
  messages: { [key: string]: Object },
};

type State = {
  anchorEl: any,
  open: boolean,
};

export class LocaleToggle extends React.PureComponent<Props, State> {
  state: State = {
    open: false,
    anchorEl: undefined,
  };

  onItemClick = (value: string) => {
    this.closeMenu();
    this.props.changeLocaleAction(value);
  };

  openMenu = (event: Event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  closeMenu = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { appLocales, messages } = this.props;

    let menuItems = null;
    if (appLocales) {
      menuItems = appLocales.map(value => (
        <MenuItem
          key={value}
          value={value}
          onClick={() => this.onItemClick(value)}
        >
          <FormattedMessage {...messages[value]} />
        </MenuItem>
      ));
    }

    return (
      <div>
        <IconButton classes={this.props.classes} onClick={this.openMenu}>
          <LanguageIcon />
        </IconButton>
        <Menu
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          onClose={this.closeMenu}
        >
          {menuItems}
        </Menu>
      </div>
    );
  }
}

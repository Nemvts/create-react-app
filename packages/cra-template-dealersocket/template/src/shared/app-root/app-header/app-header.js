// @flow
/* eslint-disable @dealersocket/dealersocket/no-stateful-component */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import ArrowBack from '@material-ui/icons/ArrowBackSharp';
import MenuIcon from '@material-ui/icons/Menu';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import { FlexSpacer } from '@dealersocket/ds-ui-react/FlexSpacer';
import type { JssClasses, Theme } from '@dealersocket/ds-ui-react/types';

import { getHistory } from '@dealersocket/react-common';
import { LocaleToggleContainer } from 'shared/language/locale-toggle/locale-toggle.container';
import { messages } from './app-header.messages';

type AppHeaderProps = {
  inMenu: boolean,
  pathname: string,
  title: string,
};

type InternalProps = {
  classes: JssClasses,
};

type Props = AppHeaderProps & InternalProps;

type State = {
  anchorEl: any,
  open: boolean,
};

class AppHeaderComp extends React.Component<Props, State> {
  // eslint-disable-line react/prefer-stateless-function
  state: State = {
    anchorEl: undefined,
    open: false,
  };

  navTo = (path: string) => {
    this.closeMenu();
    getHistory().push(path);
  };

  openMenu = (event: any) => {
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
    const renderFirstIcon = () => {
      return !this.props.inMenu ? (
        <IconButton onClick={() => getHistory().goBack()}>
          <ArrowBack classes={{ root: classes.icon }} />
        </IconButton>
      ) : (
        undefined
      );
    };

    const { classes } = this.props;

    return (
      <Toolbar classes={{ root: classes.toolbar }}>
        {renderFirstIcon()}
        <IconButton onClick={this.openMenu}>
          <MenuIcon classes={{ root: classes.icon }} />
        </IconButton>
        <Menu
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onClose={this.closeMenu}
        >
          <MenuItem onClick={() => this.navTo('/')}>
            <FormattedMessage {...messages.home} />
          </MenuItem>
          <MenuItem onClick={() => this.navTo('/dallas')}>Dallas</MenuItem>
          <MenuItem onClick={() => this.navTo('/training')}>Training</MenuItem>
          <MenuItem onClick={() => this.navTo('/usage')}>
            Components Usage
          </MenuItem>

          <Divider />
          <MenuItem onClick={() => this.navTo('/explorer')}>
            Github Explorer
          </MenuItem>
          <MenuItem onClick={() => this.navTo('/courses')}>Courses</MenuItem>
          <MenuItem onClick={() => this.navTo('/dnd-demo')}>
            Drag &amp; Drop
          </MenuItem>
          <MenuItem onClick={() => this.navTo('/courses')}>Courses</MenuItem>

          <Divider />
          <MenuItem onClick={() => this.navTo('/my')}>My Page</MenuItem>
          <MenuItem onClick={() => this.navTo('/andrea')}>
            {"Andrea's Page"}
          </MenuItem>
          <MenuItem onClick={() => this.navTo('/todo')}>
            {"Leo's Page"}
          </MenuItem>
        </Menu>

        <h2 style={{ color: '#fff' }}>{this.props.title}</h2>
        <FlexSpacer />
        <LocaleToggleContainer classes={{ root: classes.icon }} />
      </Toolbar>
    );
  }
}

const styles = (theme: Theme) => {
  return {
    icon: {
      color: theme.palette.common.white,
    },
    toolbar: {
      height: theme.ds.spacing.desktopToolbarHeight,
      backgroundColor: theme.palette.primary.dark,
      paddingLeft: theme.ds.spacing.unit,
      paddingRight: theme.ds.spacing.unit,
    },
  };
};

export const AppHeader = withStyles(styles)(AppHeaderComp);

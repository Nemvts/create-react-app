// @flow
import React from 'react';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import type { JssClasses, Theme } from '@dealersocket/ds-ui-react/types';
import { RepoListItemContainer } from './repo-list-item/repo-list-item.container';

type ExplorerPageProps = {
  changeUsernameAction: (name: string) => void,
  error: any,
  loadReposAction: () => void,
  loading: boolean,
  repos: ?(any[]),
  setNavTitleAction: (title: string) => void,
  username: string,
};

type InternalProps = {
  classes: JssClasses,
};

type Props = ExplorerPageProps & InternalProps;

class ExplorerPageComponent extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.setNavTitleAction('Github Explorer');
  }

  props: Props;

  render() {
    let mainContent = null;

    // Show a loading indicator when we're loading
    if (this.props.loading) {
      mainContent = (
        <div style={{ textAlign: 'center' }}>
          <CircularProgress />
        </div>
      );
    } else if (this.props.error !== false) {
      mainContent = (
        <ListItem primaryText="Something went wrong, please try again!" />
      );
      // If we're not loading, don't have an error and there are repos, show the repos
    } else if (this.props.repos) {
      const items = this.props.repos.map(repo => {
        return (
          <RepoListItemContainer
            key={`repo-list-item-${repo.full_name}`}
            item={repo}
          />
        );
      });
      mainContent = <List>{items}</List>;
    }

    return (
      <section className={this.props.classes.homeMainContent}>
        <form
          className={this.props.classes.usernameForm}
          onSubmit={evt => {
            evt.preventDefault();
            this.props.loadReposAction();
          }}
        >
          <label htmlFor="username">
            GitHub Username
            <input
              className={this.props.classes.usernameInput}
              id="username"
              type="text"
              value={this.props.username}
              placeholder="Enter GitHub username"
              onChange={evt =>
                this.props.changeUsernameAction(evt.target.value)
              }
            />
          </label>
        </form>
        <div className={this.props.classes.wrapper}>{mainContent}</div>
      </section>
    );
  }
}

const styles = (theme: Theme) => {
  return {
    homeMainContent: {
      margin: '30px auto',
      width: '100%',
      '&:first-child': {
        marginTop: 0,
      },
    },
    usernameForm: {
      marginBottom: 10,
    },
    usernameInput: {
      outline: 'none',
      borderBottom: '1px dotted #999',
      marginLeft: 10,
    },
    wrapper: {
      padding: 0,
      margin: 0,
      width: '100%',
      backgroundColor: theme.palette.common.white,
      border: `1px solid ${theme.palette.grey[600]}`,
      borderRadius: '3px',
      overflow: 'hidden',
    },
  };
};

export const ExplorerPage = withStyles(styles)(ExplorerPageComponent);

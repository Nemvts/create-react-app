// @flow
/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import type { JssClasses } from '@dealersocket/ds-ui-react/types';

type RepoListItemProps = {
  currentUsername: string,
  item: {
    full_name: string,
    html_url: string,
    name: string,
    open_issues_count: number,
    owner: {
      login: string,
    },
  },
};

type InternalProps = {
  classes: JssClasses,
};

const RepoListItemComponent = ({
  item,
  currentUsername,
  classes,
}: RepoListItemProps & InternalProps) => {
  let namePrefix = '';
  // If the repository is owned by a different person than we got the data for
  // it's a fork and we should show the name of the owner
  if (item.owner.login.toLowerCase() !== currentUsername.toLowerCase()) {
    namePrefix = `${item.owner.login}/`;
  }
  return (
    <ListItem key={`repo-list-item-${item.full_name}`}>
      <ListItemText
        primary={
          <a
            className={classes.repoLink}
            href={item.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {namePrefix + item.name}
          </a>
        }
      />
      <ListItemSecondaryAction>
        <a
          className={classes.issueLink}
          href={`${item.html_url}/issues`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.open_issues_count}
        </a>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const styles = () => {
  return {
    repoLink: {
      height: '100%',
      width: '100%',
      color: 'black',
      display: 'flex',
      alignItems: 'center',
    },
    issueLink: {
      height: '100%',
      width: '48px',
      color: 'black',
      display: 'inline-block',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
  };
};

export const RepoListItem = withStyles(styles)(RepoListItemComponent);

RepoListItem.defaultProps = {
  currentUsername: '',
};

// @flow
/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */
import { connect } from 'react-redux';
import { currentUserSelector } from '../../explorer.selectors';
import { RepoListItem } from './repo-list-item';

function mapStateToProps(state) {
  return {
    currentUsername: currentUserSelector(state),
  };
}

export const RepoListItemContainer = connect(mapStateToProps)(RepoListItem);

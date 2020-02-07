// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import type { TodoListType } from '../../todo.types';

export function TodoLists({ lists }: { lists: TodoListType[] }) {
  return (
    <List>
      {lists.map((list: TodoListType) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link key={list.id} to={`/todo/${list.id}`}>
          <ListItem>
            <ListItemText
              primary={list.name}
              secondary={`${list.items.length} items`}
            />
          </ListItem>
        </Link>
      ))}
    </List>
  );
}

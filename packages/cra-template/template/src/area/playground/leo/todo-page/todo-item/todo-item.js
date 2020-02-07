// @flow
import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import type { TodoItemType } from '../../todo.types';

export function TodoItem({ item }: { item: TodoItemType }) {
  return <ListItem>{item.text}</ListItem>;
}

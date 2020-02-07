// @flow
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';

import { reducer } from './todo.reducer';
import { TodoListSchema } from './schema/todo-list.schema';

const { sliceSelector } = reducer;

export const todoListsSelector = createSelector(sliceSelector, state =>
  denormalize(state.allLists, [TodoListSchema], state)
);

export const todoListSelector = (state: any, id: string) => {
  const todos = sliceSelector(state);
  if (id) {
    return denormalize(id, TodoListSchema, todos);
  }
  return undefined;
};

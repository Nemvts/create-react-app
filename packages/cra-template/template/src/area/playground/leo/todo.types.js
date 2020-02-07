// @flow
export type TodoItemType = {
  id: number,
  text: string,
};

export type TodoListType = {
  id: number,
  items: TodoItemType[],
  name: string,
};

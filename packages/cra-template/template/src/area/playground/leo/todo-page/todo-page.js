// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import type { JssClasses } from '@dealersocket/ds-ui-react/types';
import type { TodoListType, TodoItemType } from '../todo.types';

import { TodoLists } from './todo-list/todo-list';
import { TodoItem } from './todo-item/todo-item';

type TodoPageProps = {
  fetchTodoListsAction: () => void,
  selectedTodoList: TodoListType,
  setNavTitleAction: (title: string) => void,
  todoLists: TodoListType[],
};

type InternalProps = {
  classes: JssClasses,
};

type Props = TodoPageProps & InternalProps;

class TodoPageComponent extends React.Component<Props> {
  static defaultProps = {
    selectedTodoList: null,
  };

  componentDidMount() {
    this.props.setNavTitleAction("Leo's Page");
    this.props.fetchTodoListsAction();
  }

  props: Props;

  render() {
    const { todoLists, selectedTodoList, classes } = this.props;

    return (
      <section className={classes.todoPageWrapper}>
        <h2 className={classes.pageTitle}>Welcome to the Todo list manager!</h2>
        <section className={classes.todoWrapper}>
          <TodoLists lists={todoLists} />
          <div className={classes.todoDetail}>
            {selectedTodoList &&
              selectedTodoList.items &&
              selectedTodoList.items.map((item: TodoItemType) => (
                <TodoItem key={item.id} item={item} />
              ))}
          </div>
        </section>
      </section>
    );
  }
}

const styles = () => {
  return {
    todoPageWrapper: {
      flex: '1 1 auto',
      flexDrection: 'column',
      display: 'flex',
    },
    todoWrapper: {
      flex: '1 1 auto',
      display: 'flex',
      flexDirection: 'row',
    },
    todoDetail: {
      padding: '0 20px',
      flex: '1 1 auto',
    },
    pageTitle: {
      padding: '0 10px',
    },
  };
};

export const TodoPage = withStyles(styles)(TodoPageComponent);

// @flow
import { connect } from 'react-redux';
import { setNavTitleAction } from 'shared/nav/set-title.usecase';
import { fetchTodoListsAction } from './usecases/fetch-todo-list.usecase';
import { todoListSelector, todoListsSelector } from '../todo.selectors';
import { TodoPage } from './todo-page';

function mapStateToProps(state, ownProps) {
  return {
    todoLists: todoListsSelector(state),
    selectedTodoList: todoListSelector(state, ownProps.match.params.id),
  };
}

const mapDispatchToProps = {
  setNavTitleAction,
  fetchTodoListsAction,
};

export const TodoPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoPage);

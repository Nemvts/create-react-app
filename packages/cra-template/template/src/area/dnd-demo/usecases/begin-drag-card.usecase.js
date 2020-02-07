// @flow
import { createAction } from 'redux-actions';
import { reducer } from '../dnd-demo.reducer';

const BEGIN_DRAG_CARD: string = reducer.suffixKey('BEGIN_DRAG_CARD');
export const beginDragCardAction = createAction(BEGIN_DRAG_CARD);

export const actionReducerMap = {
  [BEGIN_DRAG_CARD]: (state, action) => {
    const id = action.payload;
    // Save the originalIndex of the dragged item so we can reset it
    // when dragged outside or not dropped.
    const originalIndex = state.cards.findIndex(c => c.id === id);
    const draggedItem = {
      id,
      originalIndex,
    };
    // console.log(action.type, draggedItem); // eslint-disable-line no-console
    return {
      ...state,
      draggedItem,
    };
  },
};
reducer.addActionReducerMap(actionReducerMap);

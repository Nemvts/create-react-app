// @flow
import { createAction } from 'redux-actions';
import { reducer } from '../dnd-demo.reducer';
import { arrayMoveItem } from '../utils/array-move-item.util';

const RESET_CARD: string = reducer.suffixKey('RESET_CARD');
export const resetCardAction = createAction(RESET_CARD);

export const resetCardReducer = (state: any, action: any) => {
  if (!state.draggedItem) {
    return state;
  }
  const { id, originalIndex } = state.draggedItem;
  const { cards } = state;
  const index = cards.findIndex(c => c.id === id);
  if (index === originalIndex) {
    return state;
  }
  console.log(action.type, originalIndex); // eslint-disable-line no-console
  const movedCards = arrayMoveItem(cards, index, originalIndex);
  return {
    ...state,
    cards: movedCards,
  };
};

export const actionReducerMap = {
  [RESET_CARD]: resetCardReducer,
};
reducer.addActionReducerMap(actionReducerMap);

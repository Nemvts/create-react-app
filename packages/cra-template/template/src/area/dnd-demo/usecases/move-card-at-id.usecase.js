// @flow
import { createAction } from 'redux-actions';
import { reducer } from '../dnd-demo.reducer';
import { arrayMoveItem } from '../utils/array-move-item.util';

const MOVE_CARD_AT_ID: string = reducer.suffixKey('MOVE_CARD_AT_ID');
export const moveCardAtIdAction = createAction(MOVE_CARD_AT_ID);

export const actionReducerMap = {
  [MOVE_CARD_AT_ID]: (state, action) => {
    const { cards } = state;
    const { id, atId } = action.payload;
    const index = cards.findIndex(c => c.id === id);
    const atIndex = cards.findIndex(c => c.id === atId);
    const movedCards = arrayMoveItem(cards, index, atIndex);
    // console.log(action.type, atIndex); // eslint-disable-line no-console
    return {
      ...state,
      cards: movedCards,
    };
  },
};
reducer.addActionReducerMap(actionReducerMap);

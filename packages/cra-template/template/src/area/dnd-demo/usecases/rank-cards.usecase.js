// @flow
import { createAction } from 'redux-actions';
import { reducer } from '../dnd-demo.reducer';

const RANK_CARDS: string = reducer.suffixKey('RANK_CARDS');
export const rankCardsAction = createAction(RANK_CARDS);

export const actionReducerMap = {
  [RANK_CARDS]: (state, action) => {
    console.log(action.type); // eslint-disable-line no-console
    const rankedCards = state.cards.map((card, index) => {
      return {
        ...card,
        rank: index + 1,
      };
    });
    return {
      ...state,
      cards: rankedCards,
    };
  },
};
reducer.addActionReducerMap(actionReducerMap);

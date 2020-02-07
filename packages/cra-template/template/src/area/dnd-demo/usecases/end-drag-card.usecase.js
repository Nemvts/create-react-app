// @flow
import { createAction } from 'redux-actions';
import { put, select, takeEvery } from 'redux-saga/effects';
import { mergeSaga } from '@dealersocket/react-common';
import { reducer } from '../dnd-demo.reducer';
import { rankCardsAction } from './rank-cards.usecase';
import { resetCardReducer } from './reset-card.usecase';
import { updateCardAction } from './update-card.usecase';

const END_DRAG_CARD: string = reducer.suffixKey('END_DRAG_CARD');
export const endDragCardAction = createAction(END_DRAG_CARD);

function* endDragCardWatch(): any {
  yield takeEvery(END_DRAG_CARD, endDragCardWorker);
}
mergeSaga(endDragCardWatch);

function* endDragCardWorker(action: any): any {
  console.log('after END_DRAG_CARD reducer', action.payload); // eslint-disable-line no-console
  const { didDrop, id } = action.payload;
  if (didDrop) {
    yield put(rankCardsAction());
    const state = yield select();
    const { cards } = state.dndDemo;
    const card = cards.find(c => c.id === id);
    const toIndex = cards.findIndex(c => c.id === id);

    const clone = {
      ...card,
      rank: toIndex + 1,
    };
    yield put(updateCardAction(clone));
  }
}

const actionReducerMap = {
  [END_DRAG_CARD]: (state, action) => {
    const { didDrop } = action.payload;
    // console.log(END_DRAG_CARD, didDrop); // eslint-disable-line no-console
    const resultState = didDrop ? state : resetCardReducer(state, action);
    return {
      ...resultState,
      draggedItem: undefined,
    };
  },
};
reducer.addActionReducerMap(actionReducerMap);

export const testPort = {
  END_DRAG_CARD,
  endDragCardWatch,
  endDragCardWorker,
  actionReducerMap,
};

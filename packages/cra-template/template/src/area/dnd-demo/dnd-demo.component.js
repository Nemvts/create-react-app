// @flow
import React, { Component } from 'react';
import type { CardType } from './item-types';
import { List } from './components/list.component';

type Props = {
  beginDragCardAction: (id: number) => void,
  cards: CardType[],
  endDragCardAction: (payload: { didDrop: boolean, id: number }) => void,
  getCardsAction: () => void,
  moveCardAtIdAction: (payload: { atId: number, id: number }) => void,
  resetCardAction: () => void,
};

export class DndDemo extends Component<Props> {
  componentDidMount() {
    this.props.getCardsAction();
  }

  props: Props;

  render() {
    const {
      cards,
      beginDragCardAction,
      endDragCardAction,
      moveCardAtIdAction,
      resetCardAction,
    } = this.props;

    return (
      <div>
        <List
          cards={cards}
          beginDragCardAction={beginDragCardAction}
          endDragCardAction={endDragCardAction}
          moveCardAtIdAction={moveCardAtIdAction}
          resetCardAction={resetCardAction}
        />
      </div>
    );
  }
}

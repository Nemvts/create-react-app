// @flow
import React, { Component } from 'react';
import type { Node } from 'react';
import { compose } from 'redux';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Card } from './card.component';
import { ItemTypes } from '../item-types';
import type { CardType } from '../item-types';

type ListProps = {
  beginDragCardAction: (id: number) => void,
  cards: CardType[],
  endDragCardAction: (payload: { didDrop: boolean, id: number }) => void,
  moveCardAtIdAction: (payload: { atId: number, id: number }) => void,
  resetCardAction: () => void,
};

type InternalProps = {
  connectDropTarget: (node: Node) => Node,
  didDrop: boolean,
  isOverList: boolean,
};

type Props = ListProps & InternalProps;

const listTargetSpec = {
  // Note: 'drop' is called only if allowed by 'canDrop' in this or any child target like the cardTargetSpec!
  // drop(props:ListProps, monitor) {
  //   console.log('listTargetSpec.drop', monitor.didDrop());
  // },
};

class ListComponent extends Component<Props> {
  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    // Reset card position if dragging outside the list
    if (this.props.isOverList !== nextProps.isOverList) {
      if (!nextProps.isOverList && !nextProps.didDrop) {
        this.props.resetCardAction();
      }
    }
  }

  props: Props;

  render() {
    const {
      cards,
      connectDropTarget,
      beginDragCardAction,
      endDragCardAction,
      moveCardAtIdAction,
    } = this.props;

    return connectDropTarget(
      <div style={getStyle(this.props)}>
        {cards.map((card: CardType) => (
          <Card
            key={card.id}
            id={card.id}
            moveCardAtIdAction={moveCardAtIdAction}
            onBeginDragCard={beginDragCardAction}
            onEndDragCard={endDragCardAction}
            rank={card.rank}
            text={card.text}
          />
        ))}
      </div>
    );
  }
}
export const List = compose(
  DragDropContext(HTML5Backend),
  DropTarget(ItemTypes.CARD, listTargetSpec, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    didDrop: monitor.didDrop(),
    isOverList: monitor.isOver(),
  }))
)(ListComponent);

function getStyle({ isOverList }) {
  return {
    width: 400,
    border: isOverList ? '1px solid black' : '1px solid #eee',
  };
}

// @flow
import React from 'react';
import type { Node } from 'react';
import { compose } from 'redux';
import { DragSource, DropTarget } from 'react-dnd';
import { ItemTypes } from '../item-types';

type CardProps = {
  id: number,
  moveCardAtIdAction: (payload: { atId: number, id: number }) => void,
  onBeginDragCard: (id: number) => void,
  onEndDragCard: (payload: { didDrop: boolean, id: number }) => void,
  rank: number,
  text: string,
};

type InternalProps = {
  connectDragSource: (node: Node) => Node,
  connectDropTarget: (node: Node) => Node,
  isDragging: boolean,
};

type Props = CardProps & InternalProps;

const cardSourceSpec = {
  beginDrag(props: CardProps) {
    const { id } = props;
    props.onBeginDragCard(id);
    return { id }; // info about the dragged item
  },

  endDrag(props: CardProps, monitor) {
    // console.log('dropResult', monitor.getDropResult());
    const didDrop = monitor.didDrop();
    const { id } = props;
    props.onEndDragCard({ didDrop, id });
  },
};

const cardTargetSpec = {
  canDrop() {
    // Returns false will prevent 'drop' to be called on all targets including the parent listTargetSpec!
    // The store gets updated in 'endDrag'.
    return false;
  },

  hover(props: CardProps, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;
    if (draggedId !== overId) {
      // Move card while hovering for instant feedback.
      // Position may later be reset when dragged outside the list or not dropped.
      props.moveCardAtIdAction({ id: draggedId, atId: overId });
    }
  },

  // drop(props:CardProps, monitor) {
  //   // const didDrop = monitor.didDrop();
  //   // console.log('cardTargetSpec.drop', didDrop);
  //   // return the dropResult
  //   return {
  //     abc: 123,
  //   };
  // },
};

function CardComponent({
  connectDragSource,
  connectDropTarget,
  isDragging,
  text,
  rank,
}: Props) {
  const style = getStyle(isDragging);

  return connectDragSource(
    connectDropTarget(<div style={style}>{`${rank}. ${text}`}</div>)
  );
}
export const Card = compose(
  DropTarget(ItemTypes.CARD, cardTargetSpec, connect => ({
    connectDropTarget: connect.dropTarget(),
  })),
  DragSource(ItemTypes.CARD, cardSourceSpec, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }))
)(CardComponent);

function getStyle(isDragging: boolean) {
  return {
    border: '1px dashed gray',
    padding: '10px 10px',
    marginBottom: '5px',
    backgroundColor: 'white',
    cursor: 'move',
    fontSize: 16,
    // While dragging, the card is hidden so its space stays visible in the list
    opacity: isDragging ? 0 : 1,
  };
}

// @flow
import { connect } from 'react-redux';
import { beginDragCardAction } from './usecases/begin-drag-card.usecase';
import { endDragCardAction } from './usecases/end-drag-card.usecase';
import { getCardsAction } from './usecases/get-cards.usecase';
import { moveCardAtIdAction } from './usecases/move-card-at-id.usecase';
import { resetCardAction } from './usecases/reset-card.usecase';
import { DndDemo } from './dnd-demo.component';

function mapStateToProps(state) {
  return {
    cards: state.dndDemo.cards,
  };
}

const mapDispatchToProps = {
  beginDragCardAction,
  endDragCardAction,
  getCardsAction,
  moveCardAtIdAction,
  resetCardAction,
};

export const DndDemoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DndDemo);

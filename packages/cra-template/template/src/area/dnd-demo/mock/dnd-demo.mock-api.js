// @flow
import { axiosResult, getAppSettings } from '@dealersocket/react-common';
import type { CardType } from '../item-types';

let calls = 0;
const generateId = () => new Date().valueOf();

let cards = [];

const getCards = () => {
  return axiosResult(cards);
};

const pushNewCards = (count: number) => {
  for (let id = 1; id <= count; id += 1) {
    cards.push({
      id,
      rank: id,
      text: String.fromCharCode(64 + id),
      updated: generateId(),
    });
  }
};
pushNewCards(5);

const rankCards = () => {
  const sorted = cards.sort((a: CardType, b: CardType) => {
    if (a.rank === b.rank) {
      return b.updated - a.updated; // Descending order
    }
    return a.rank - b.rank;
  });
  let rank = 0;
  return sorted.map((c: CardType) => {
    const card = { ...c };
    if (card.rank) {
      rank += 1;
      card.rank = rank;
    }
    return card;
  });
};

const saveCard = cardToSave => {
  calls += 1;
  if (calls % 2 === 0) {
    return axiosResult(null, 'Server Error (Simulated)');
  }
  const card = { ...cardToSave }; // shallow copy
  card.updated = generateId();
  if (card.rank === null) {
    card.rank = 999999; // add to the end
  }
  let httpCode = 200;
  if (card.id) {
    const existingIndex = cards.findIndex(c => c.id === card.id);
    cards.splice(existingIndex, 1, card);
  } else {
    card.id = generateId();
    cards.push(card);
    httpCode = 201;
  }
  cards = rankCards();
  return axiosResult(cards, null, httpCode);
};

export function mockApi(axiosMock: any) {
  axiosMock
    .onAny(`${getAppSettings().globalApiUrl}/dnd-demo/cards`)
    .reply(config => {
      switch (config.method) {
        case 'get': {
          return getCards();
        }
        case 'post':
        case 'put': {
          return saveCard(JSON.parse(config.data));
        }
        default:
          return axiosResult(null, 'Mock API not implemented', 501);
      }
    });
}

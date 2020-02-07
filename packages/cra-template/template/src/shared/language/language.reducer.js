// @flow
import { createAndMergeSliceReducer } from '@dealersocket/react-common';

import { DEFAULT_LOCALE } from 'shared/i18n';

const sliceName = 'language';

const initialState = {
  locale: DEFAULT_LOCALE,
};

export const reducer = createAndMergeSliceReducer(sliceName, initialState);

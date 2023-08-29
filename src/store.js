import { configureStore } from '@reduxjs/toolkit';

import { loadState } from './browser-storage';

import pearsonReducer from './slices/pearsonSlice';
import trackingReducer from './slices/trackingSlice';
import listsReducer from './slices/listsSlice';

export default configureStore({
  reducer: { pearson: pearsonReducer, tracking: trackingReducer, lists: listsReducer },
  preloadedState: loadState(),
});

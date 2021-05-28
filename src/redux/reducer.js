import createReducer from '@helper/createReducer';
import * as types from './types';

const initialState = {
  saveSearches: [],
};

export const mapsReducer = createReducer(initialState, {
  [types.SAVE_SEARCHES](state, payload) {
    return {
      ...state,
      saveSearches: [...state.saveSearches, payload.response],
    };
  },
});

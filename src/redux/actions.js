import * as types from './types';

export const fetchMarkers = markers => {
  return {type: types.FETCH_MARKERS, markers};
};

export function saveSearches(response) {
  return {
    type: types.SAVE_SEARCHES,
    response,
  };
}

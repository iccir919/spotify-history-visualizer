import { FETCH_RECENTLY_PLAYED } from '../actions/types';

const initialState = {
  tracks: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_RECENTLY_PLAYED: {
      return { ...state, tracks: action.payload };
    }
    default: {
      return state;
    }
  }
}

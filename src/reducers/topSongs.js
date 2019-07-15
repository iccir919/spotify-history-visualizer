import {
  FETCH_TOP_SONGS_LONG_TERM,
  FETCH_TOP_SONGS_MEDIUM_TERM,
  FETCH_TOP_SONGS_SHORT_TERM
} from '../actions/types';

const initialState = {
  longTerm: [],
  mediumTerm: [],
  shortTerm: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TOP_SONGS_LONG_TERM: {
      return { ...state, longTerm: action.payload };
    }
    case FETCH_TOP_SONGS_MEDIUM_TERM: {
      return { ...state, mediumTerm: action.payload };
    }
    case FETCH_TOP_SONGS_SHORT_TERM: {
      return { ...state, shortTerm: action.payload };
    }
    default: {
      return state;
    }
  }
}

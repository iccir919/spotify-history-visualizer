import { FETCH_AUDIO_FEATURES } from '../actions/types';

const initialState = {
  tracksDetailed: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_AUDIO_FEATURES: {
      return { ...state, tracksDetailed: action.payload };
    }
    default: {
      return state;
    }
  }
}

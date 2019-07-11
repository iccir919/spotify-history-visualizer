import { FETCH_USER_PROFILE } from '../actions/types';

const initialState = {
  profile: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_PROFILE: {
      return { ...state, profile: action.payload };
    }

    default: {
      return state;
    }
  }
}

const SET_USER_LOGGED_IN = 'auth/SET_USER_LOGGED_IN';
const SET_USER_LOGGED_OUT = 'auth/SET_USER_LOGGED_OUT';

const initialState = {
  isLoggedIn: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_LOGGED_IN: {
      return { ...state, isLoggedIn: true };
    }
    case SET_USER_LOGGED_OUT: {
      return { ...state, isLoggedIn: false };
    }
    default: {
      return state;
    }
  }
}

import config from '../config';
import queryParametrize from '../services/query-parametrize';

export const authorizeUser = () => dispatch => {
  const loginOpts = {
    client_id: config.SPOTIFY_CLIENT_ID,
    redirect_uri: config.CALLBACK_URL,
    scope: config.SPOTIFY_AUTH_SCOPES,
    response_type: 'token'
  };
  const loginUrl = queryParametrize(config.SPOTIFY_AUTHORIZE_URL, loginOpts);

  window.location.href = loginUrl;
};

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

import config from '../config';
import queryParametrize from '../services/query-parametrize';
import parseAccessToken from '../services/auth';
import history from '../services/history';

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

export const verifyToken = () => dispatch => {
  const accessToken = parseAccessToken();

  if (accessToken) {
    localStorage.setItem('token', accessToken);
    dispatch({ type: SET_USER_LOGGED_IN });
    history.push('/feature');
  } else {
    dispatch({ type: SET_USER_LOGGED_OUT });
  }
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

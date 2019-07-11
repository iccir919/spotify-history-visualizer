import config from '../config';
import queryParametrize from '../services/query-parametrize';
import parseAccessToken from '../services/auth';

import { AUTH_USER, AUTH_ERROR } from './types';

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
    dispatch({ type: AUTH_USER, payload: accessToken });
  }
};

export const signOut = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: ''
  };
};

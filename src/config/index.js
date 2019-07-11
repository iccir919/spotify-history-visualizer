import ENV from '../env';

let callback_url;

if (window.location.origin === 'http://localhost:3000') {
  callback_url = 'http://localhost:3000/';
} else {
  callback_url = 'https://iccir919.github.io/reduxify/';
}

const config = {
  API_URL: 'https://api.spotify.com/v1',
  SPOTIFY_AUTHORIZE_URL: 'https://accounts.spotify.com/authorize',
  SPOTIFY_AUTH_SCOPES:
    'user-read-recently-played playlist-modify-public user-top-read',
  SPOTIFY_CLIENT_ID: ENV.SPOTIFY_CLIENT_ID,
  CALLBACK_URL: callback_url
};

export default config;

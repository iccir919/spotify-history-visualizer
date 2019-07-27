import {
  AUTH_USER,
  FETCH_RECENTLY_PLAYED,
  FETCH_AUDIO_FEATURES
} from './types';
import spotify from '../services/spotify';

export const fetchRecentlyPlayed = timeRange => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    spotify
      .get('/me/player/recently-played', {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: 50, time_range: timeRange }
      })
      .then(recentlyPlayedResponse => {
        const arrOfIds = recentlyPlayedResponse.data.items.map(
          item => item.track.id
        );
        spotify
          .get('/audio-features', {
            headers: { Authorization: `Bearer ${token}` },
            params: { ids: arrOfIds.join(',') }
          })
          .then(detailedTracksResponse => {
            dispatch({
              type: FETCH_AUDIO_FEATURES,
              payload: detailedTracksResponse.data.audio_features
            });
            dispatch({
              type: FETCH_RECENTLY_PLAYED,
              payload: recentlyPlayedResponse.data.items
            });
          });
      });
  } catch (e) {
    dispatch({ type: AUTH_USER, payload: '' });
  }
};

import {
  AUTH_USER,
  FETCH_TOP_SONGS_LONG_TERM,
  FETCH_TOP_SONGS_MEDIUM_TERM,
  FETCH_TOP_SONGS_SHORT_TERM
} from './types';
import spotify from '../services/spotify';

export const fetchTopSongs = timeRange => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    const response = await spotify.get('/me/top/tracks', {
      headers: { Authorization: `Bearer ${token}` },
      params: { limit: 50, time_range: timeRange }
    });
    if (timeRange === 'long_term') {
      dispatch({
        type: FETCH_TOP_SONGS_LONG_TERM,
        payload: response.data.items
      });
    } else if (timeRange === 'medium_term') {
      dispatch({
        type: FETCH_TOP_SONGS_MEDIUM_TERM,
        payload: response.data.items
      });
    } else if (timeRange === 'short_term') {
      dispatch({
        type: FETCH_TOP_SONGS_SHORT_TERM,
        payload: response.data.items
      });
    }
  } catch (e) {
    dispatch({ type: AUTH_USER, payload: '' });
  }
};

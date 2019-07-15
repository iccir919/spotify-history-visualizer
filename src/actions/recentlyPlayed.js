import { AUTH_USER, FETCH_RECENTLY_PLAYED } from './types';
import spotify from '../services/spotify';

export const fetchRecentlyPlayed = timeRange => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    const response = await spotify.get('/me/player/recently-played', {
      headers: { Authorization: `Bearer ${token}` },
      params: { limit: 50, time_range: timeRange }
    });
    dispatch({
      type: FETCH_RECENTLY_PLAYED,
      payload: response.data.items
    });
  } catch (e) {
    dispatch({ type: AUTH_USER, payload: '' });
  }
};

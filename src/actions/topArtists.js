import {
  FETCH_TOP_ARTISTS_LONG_TERM,
  FETCH_TOP_ARTISTS_MEDIUM_TERM,
  FETCH_TOP_ARTISTS_SHORT_TERM
} from './types';
import spotify from '../services/spotify';

export const fetchTopArtists = timeRange => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    const response = await spotify.get('/me/top/artists', {
      headers: { Authorization: `Bearer ${token}` },
      params: { limit: 50, time_range: timeRange }
    });
    if (timeRange === 'long_term') {
      dispatch({
        type: FETCH_TOP_ARTISTS_LONG_TERM,
        payload: response.data.items
      });
    } else if (timeRange === 'medium_term') {
      dispatch({
        type: FETCH_TOP_ARTISTS_MEDIUM_TERM,
        payload: response.data.items
      });
    } else if (timeRange === 'short_term') {
      dispatch({
        type: FETCH_TOP_ARTISTS_SHORT_TERM,
        payload: response.data.items
      });
    }
  } catch (e) {
    console.log(e);
  }
};

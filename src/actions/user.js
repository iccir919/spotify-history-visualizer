import { FETCH_USER_PROFILE } from './types';
import spotify from '../services/spotify';

export const fetchUserProfile = () => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    const response = await spotify.get('/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch({
      type: FETCH_USER_PROFILE,
      payload: response.data
    });
  } catch (e) {
    console.log(e);
  }
};

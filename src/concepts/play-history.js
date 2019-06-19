import spotify from '../services/spotify';

const FETCH_PLAY_HISTORY_SUCCESS = 'FETCH_PLAY_HISTORY_SUCCESS';

export const fetchRecentlyPlayed = callback => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    const response = await spotify.get('/me/player/recently-played', {
      headers: { Authorization: `Bearer ${token}` },
      params: { limit: 50 }
    });
    dispatch({
      type: FETCH_PLAY_HISTORY_SUCCESS,
      payload: response.data.items
    });
    // callback();
  } catch (e) {
    console.log(e);
  }
};

const initialState = {
  data: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PLAY_HISTORY_SUCCESS: {
      return { ...state, data: action.payload };
    }

    default: {
      return state;
    }
  }
}

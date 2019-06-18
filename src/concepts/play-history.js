import spotify from '../services/spotify';

const FETCH_PLAY_HISTORY_SUCCESS = 'FETCH_PLAY_HISTORY';

export const fetchRecentlyPlayed = callback => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    const response = await spotify.get('/me/player/recently-played', {
      headers: { Authorization: `Bearer ${token}` },
      params: { limit: 50 }
    });
    console.log(response);
    // dispatch({
    //   type: FETCH_PLAY_HISTORY_SUCCESS,
    //   payload: response.data
    // });
    // callback();
  } catch (e) {
    console.log(e);
  }
};

const initialState = {
  history: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PLAY_HISTORY_SUCCESS: {
      return { ...state, history: action.payload };
    }

    default: {
      return state;
    }
  }
}

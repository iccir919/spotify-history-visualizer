import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import topSongs from './topSongs';
import topArtists from './topArtists';
import recentlyPlayed from './recentlyPlayed';

export default combineReducers({
  auth,
  user,
  recentlyPlayed,
  topArtists,
  topSongs
});

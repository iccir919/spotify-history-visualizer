import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import topArtists from './topArtists';

export default combineReducers({
  auth,
  user,
  topArtists
});

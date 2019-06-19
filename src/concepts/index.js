import { combineReducers } from 'redux';
import auth from './auth';
import history from './play-history';

export default combineReducers({
  auth,
  history
});

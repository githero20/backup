import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import snapReducer from './snap/reducer';

export default combineReducers({
  auth: authReducer,
  snap: snapReducer,
});

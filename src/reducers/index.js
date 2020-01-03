import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import refererReducer from './referer/refererReducer';

const rootReducer = combineReducers({
  authReducer,
  refererReducer
});

export default rootReducer;
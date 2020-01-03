import authState from './authState';
import { SET_AUTH_STATE } from '../../constants/action-types';

const authReducer = (state = authState, action) => {
  switch (action.type) {
    case SET_AUTH_STATE:
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
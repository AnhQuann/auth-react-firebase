import refererState from './refererState';
import { SET_REFERER } from '../../constants/action-types';

const refererReducer = (state = refererState, action) => {
  switch (action.type) {
    case SET_REFERER:
      const { refererPrivate, refererAuth } = action.payload;
      return {
        ...state,
        refererPrivate: refererPrivate ? refererPrivate : "/",
        refererAuth: refererAuth ? refererAuth : "/sign-in"
      }
    default:
      return state;
  }
};

export default refererReducer;  
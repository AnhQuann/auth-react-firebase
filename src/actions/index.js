import {
  SET_AUTH_STATE,
  SET_REFERER
} from '../constants/action-types';

export const setAuthState = (authenticated, currentUser, appLoading) => ({
  type: SET_AUTH_STATE,
  payload: {
    authenticated,
    currentUser,
    appLoading
  }
});

export const setReferer = (refererPrivate, refererAuth) => ({
  type: SET_REFERER,
  payload: {
    refererPrivate,
    refererAuth
  }
});
import React from 'react';
import app from '../../config/firebase';
import store from '../../store';
import { setAuthState } from '../../actions';

export const Home = (props) => {
  const { history } = props;
  const {
    authReducer: {
      currentUser
    },
    refererReducer: {
      refererAuth
    }
  } = store.getState();

  function signOut() {
    app.auth().signOut()
    .then(() => updateAuthState(false, null, false))
    .then(() => goToReferer());
  }

  function goToReferer() {
    history.push(refererAuth);
  }

  function updateAuthState(authenticated, user, appLoading) {
    store.dispatch(setAuthState(authenticated, user, appLoading))
  }

  return (
    <div>
      <p>{`Welcome ${currentUser.email}`}</p>
      <button onClick={signOut}>SignOut</button>
    </div>
  )
};

import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import store from '../store';
import { setReferer } from '../actions';

const PrivateRoute = ({ component: PrivateComponent, ...rest }) => {
  const {
    authReducer: {
      authenticated
    }
  } = store.getState();
  
  useEffect(() => {
    const { path } = rest;
    store.dispatch(setReferer(path));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Route
      {...rest}
      render={props => (
        authenticated
          ? <PrivateComponent {...props} />
          : <Redirect to="/sign-in" />
      )}
    />
  )
};

export default PrivateRoute;
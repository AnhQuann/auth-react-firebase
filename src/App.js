import React, { useEffect } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import store from './store';
import { updateAuthState } from './api/auth';
import { setAuthState } from './actions';
import PrivateRoute from './routes/PrivateRoute';
import './App.scss';
import { Loading } from './components/Loading/Loading';
import { SignIn } from './screens/SignIn/SignIn';
import { SignUp } from './screens/SignUp/SignUp';
import { Home } from './screens/Home/Home';

function App() {
  const {
    authReducer: {
      appLoading
    }
  } = store.getState();

  useEffect(() => {
    updateAuthState().then(authState => {
      const { authenticated, currentUser, appLoading } = authState;
      store.dispatch(setAuthState(authenticated, currentUser, appLoading))
    })
  }, [])

  return (
    appLoading
      ? <Loading />
      : (
        <BrowserRouter>
          <AnimatedSwitch
            atEnter={{ offset: -50, opacity: 0 }}
            atLeave={{ offset: 10, opacity: 0 }}
            atActive={{ offset: 0, opacity: 1 }}
            className="switch-wrapper"
            mapStyles={(styles) => ({
              opacity: styles.opacity,
              transform: `translateX(${styles.offset}px)`,
            })}
          >
            <PrivateRoute path="/" exact component={Home} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
          </AnimatedSwitch>
        </BrowserRouter>
      )

  );
};

export default App;

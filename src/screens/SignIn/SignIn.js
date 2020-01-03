import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import app from '../../config/firebase';
import store from '../../store';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { Style_SignInBtn, Style_RedirectLink, Style_ServerErrors } from './SignIn.style';
import withValidated from '../../hoc/Form/Form';
import { setAuthState, setReferer } from '../../actions';

const SignInComponent = (props) => {

  const {
    history,
    formValues,
    isValidated,
    initState,
    handleChange,
    initValidation,
    validate,
    setLoading,
    setDisabled,
    errors,
    disabled,
    loading,
    serverErrors,
    setServerErrors
  } = props;

  const state = { email: '', password: '' };
  const {
    authReducer: {
      authenticated
    },
    refererReducer: {
      refererPrivate
    }
  } = store.getState();

  const schemaValidation = yup.object().shape({
    email: yup.string().required('Email is a requred field.').email('Email must be a valid email.'),
    password: yup.string().required('Password is a requred field.').min(6, "")
  });

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setDisabled(true);
    if (isValidated) {
      app.auth().signInWithEmailAndPassword(formValues.email, formValues.password)
        .then((res) => {
          setLoading(false);
          setDisabled(false);
          updateAuthState(true, res.user, false);
          goToReferer();
        })
        .catch((err) => {
          setServerErrors(err.message);
          setLoading(false);
          setDisabled(false);
        })

    } else {
      validate();
    }
  };

  function updateAuthState(authenticated, user, appLoading) {
    store.dispatch(setAuthState(authenticated, user, appLoading))
  }

  function goToReferer() {
    history.push(refererPrivate);
  }

  useEffect(() => {
    store.dispatch(setReferer(null, history.location.pathname));
    if (authenticated) {
      goToReferer();
    } else {
      initState(state);
      initValidation(schemaValidation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <Input
        handleChange={handleChange}
        id="email" type="text" label="Email" icon="email" autoComplete="username"
        value={formValues ? formValues.email : state.email}
        error={errors && errors.email}
      />
      <Input
        handleChange={handleChange}
        id="password" type="password" label="Password" icon="lock" autoComplete="current-password"
        value={formValues ? formValues.password : state.password}
        error={errors && errors.password}
      />
      <Button label="Sign In" styleBtn={Style_SignInBtn} disabled={disabled} loading={loading} />
      <div style={Style_ServerErrors} className={`error ${serverErrors ? 'slidedown' : 'slideup'}`}>
        <span>{serverErrors}</span>
      </div>
      <Link to="/sign-up">
        <div style={Style_RedirectLink}>
          Don't have an account? Sign up now!
        </div>
      </Link>
    </form>
  )
};

export const SignIn = withValidated(SignInComponent);
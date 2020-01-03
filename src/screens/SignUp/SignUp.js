import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import app from '../../config/firebase';
import store from '../../store';
import { setReferer, setAuthState } from '../../actions';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { Style_SignUpBtn, Style_RedirectLink, Style_ServerErrors } from './SignUp.style';
import withValidated from '../../hoc/Form/Form';

const SignUpComponent = (props) => {

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

  const state = { email: '', password: '', confirmPassword: '' };

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
    password: yup.string().required('Password is a requred field.').min(6, 'Password should be at least 6 charaters.'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Confirm Password must match.').required('Confirm Password is a requred field.')
  });

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setDisabled(true);
    if (isValidated) {
      app.auth().createUserWithEmailAndPassword(formValues.email, formValues.password)
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

  function goToReferer() {
    history.push(refererPrivate);
  }

  function updateAuthState(authenticated, user, appLoading) {
    store.dispatch(setAuthState(authenticated, user, appLoading))
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
        id="password" type="password" label="Password" icon="lock" autoComplete="new-password"
        value={formValues ? formValues.password : state.password}
        error={errors && errors.password}
      />
      <Input
        handleChange={handleChange}
        id="confirmPassword" type="password" label="Confirm Password" icon="lock_outline" autoComplete="new-password"
        value={formValues ? formValues.confirmPassword : state.confirmPassword}
        error={errors && errors.confirmPassword}
      />
      <Button label="Sign Up" styleBtn={Style_SignUpBtn} disabled={disabled} loading={loading} />
      <div style={Style_ServerErrors} className={`error ${serverErrors ? 'slidedown' : 'slideup'}`}>
        <span>{serverErrors}</span>
      </div>
      <Link to="/sign-in">
        <div style={Style_RedirectLink}>
          Already have an account? Sign in now!
        </div>
      </Link>
    </form>
  )
};

export const SignUp = withValidated(SignUpComponent);
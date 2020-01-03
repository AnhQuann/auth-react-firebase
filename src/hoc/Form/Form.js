import React, { Component } from 'react';

const withValidated = Form => class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: null,
      schemaValidation: null,
      isValidated: false,
      errors: null,
      disabled: true,
      loading: false,
      serverErrors: null
    };
  }

  initState = (state) => {
    this.setState({ formValues: state })
  }

  handleChange = (e) => {
    e.persist();
    const { formValues } = this.state;
    const newValues = { ...formValues, [e.target.id]: e.target.value };
    this.setState({ formValues: newValues }, () => { this.validate(e.target.id) });
  }

  validate = (id) => {
    const { formValues, errors } = this.state;
    this.validation(formValues).then(validateState => {
      const { errorsState, isValidated, disabled } = validateState;
      if (id) {
        const newErrors = {...errors, [id]: errorsState[id]};
        this.setState({ errors: newErrors, isValidated, disabled })
      } else {
        this.setState({ errors: errorsState, isValidated, disabled });
      }
    });
  }

  setLoading = (loading) => {
    this.setState({ loading });
  }

  setDisabled = (disabled) => {
    this.setState({ disabled });
  }

  setServerErrors = (serverErrors) => {
    this.setState({ serverErrors })
  }

  initValidation = (schemaValidation) => {
    const errors = this.clearObject(schemaValidation.fields);
    this.setState({ schemaValidation, errors });
  }

  validation = (values = this.state.formValues) => {
    const { schemaValidation } = this.state;
    return new Promise((resolve, reject) => {
      schemaValidation.validate(values, { abortEarly: false })
        .then((values) => resolve({ isValidated: true, errorsState: this.clearObject(values), disabled: false }))
        .catch((yupErrors) => {
          const errors = this.getErrors(yupErrors);
          resolve({ isValidated: false, errorsState: errors, disabled: true });
        });
    });
  };

  clearObject = (obj) => {
    const blankObj = {};
    Object.keys(obj).forEach(key => blankObj[key] = "");
    return blankObj;
  }

  getErrors = (yupErrors) => {
    return yupErrors.inner.reduce((obj, error) => ({
      ...obj,
      [error.path]: error.message
    }), {})
  };

  render() {
    const { formValues, isValidated, errors, serverErrors, disabled, loading } = this.state;
    const { history } = this.props;
    return (
      <Form
        history={history}
        initState={this.initState}
        handleChange={this.handleChange}
        initValidation={this.initValidation}
        validate={this.validate}
        setLoading={this.setLoading}
        setDisabled={this.setDisabled}
        setServerErrors={this.setServerErrors}
        formValues={formValues}
        isValidated={isValidated}
        errors={errors}
        serverErrors={serverErrors}
        disabled={disabled}
        loading={loading}
      />
    )
  }
};

export default withValidated;
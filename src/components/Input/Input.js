import React from 'react';
import './Input.scss';

export const Input = (props) => {
  const {
    icon,
    label,
    type,
    autoComplete,
    value,
    handleChange,
    id,
    error
  } = props;

  return (
    <div className="input-field">
      {icon && <i className="material-icons prefix">{icon}</i>}
      <input
        id={id}
        type={type}
        className={`${error ? 'invalid' : 'valid'} validate`}
        autoComplete={autoComplete}
        value={value}
        onChange={handleChange}
      />
      <label htmlFor={id}>{label}</label>
      <div className={`error ${error ? 'slidedown' : 'slideup'}`}>
        <span>{error}</span>
      </div>
    </div>
  )
};

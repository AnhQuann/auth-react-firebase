import React from 'react';
import './Button.scss';

export const Button = (props) => {
  const {
    shape,
    icon,
    label,
    iconSide,
    disabled,
    styleBtn,
    styleIcon,
    loading
  } = props;
  return (
    <button
      className={`waves-effect waves-light ${shape ? `btn-${shape}` : 'btn'} ${disabled && 'disabled'}`}
      style={styleBtn}
    >
      {icon && <i style={styleIcon} class={`material-icons ${iconSide}`}>{icon}</i>}
      {loading ? <div className="loading"></div> : label}
    </button>
  )
};

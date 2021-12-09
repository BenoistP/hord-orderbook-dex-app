import React from 'react';
import trans from 'translate';

import './Input.scss';

const Input = ({ style, type, onChange, value, placeholder, className, name, disabled = false }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    style={style}
    placeholder={placeholder ? trans(placeholder) : ''}
    className={`input${className ? ` ${className}` : ''}`}
    name={name}
    disabled={disabled}
  />
);

export default Input;

import React from 'react';
import PropTypes from 'prop-types';
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

Input.defaultProps = {
  style: null,
  value: '',
  placeholder: null,
  className: null,
  name: null,
  disabled: false,
};

Input.propTypes = {
  style: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default Input;

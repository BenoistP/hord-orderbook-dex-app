import React from 'react';
import trans from 'translate';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './Button.scss';

// https://github.com/yannickcr/eslint-plugin-react/issues/1846
const Button = ({ onClick, style, className, text, type = 'button', disabled, ...rest }) => {
  const classNames = clsx(className, { disabled });
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      onClick={onClick}
      className={`button ${classNames}`}
      style={style}
      disabled={disabled}
      {...rest}
    >
      {trans(text)}
    </button>
  );
};

Button.defaultProps = {
  style: undefined,
  className: '',
  type: 'button',
  disabled: false,
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  style: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;

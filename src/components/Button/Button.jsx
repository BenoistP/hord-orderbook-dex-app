import React from 'react';

import './Button.scss';

// https://github.com/yannickcr/eslint-plugin-react/issues/1846
const Button = ({ onClick, style, className, text, type = 'button', disabled, ...rest }) => {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      onClick={onClick}
      className={`button ${className}`}
      style={style}
      disabled={disabled}
      {...rest}
    >
      {text}
    </button>
  );
};

export default Button;

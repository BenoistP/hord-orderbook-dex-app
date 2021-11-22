import React from 'react';

import './Container.scss';

// Standard container is column
const Container = ({ onClick, style, className, children, row, centered }) => (
  <div
    onClick={onClick}
    className={`${row ? 'row' : 'col'}${className ? ` ${className}` : ''}`}
    style={{
      ...style,
      ...(centered && {
        alignItems: 'center',
        justifyContent: 'center',
      }),
    }}
  >
    {children}
  </div>
);

export default Container;

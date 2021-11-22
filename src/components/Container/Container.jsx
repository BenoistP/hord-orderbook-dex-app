import React from 'react';
import PropTypes from 'prop-types';

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

Container.defaultProps = {
  onClick: null,
  style: null,
  className: null,
  children: null,
  row: null,
  centered: null,
};

Container.propTypes = {
  onClick: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
  row: PropTypes.bool,
  centered: PropTypes.bool,
};

export default Container;

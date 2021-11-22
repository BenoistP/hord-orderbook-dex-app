import React from 'react';
import trans from 'translate';
import PropTypes from 'prop-types';

const Text = ({ text, dontTranslate = false, ...rest }) => (
  <span {...rest}>{text || text === 0 ? (dontTranslate ? text : trans(text)) : null}</span>
);

Text.defaultProps = {
  dontTranslate: false,
  text: null,
};

Text.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  dontTranslate: PropTypes.bool,
};

export default Text;

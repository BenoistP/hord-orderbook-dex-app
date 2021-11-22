import React from 'react';


const Text = ({ text, dontTranslate = false, ...rest }) => (
  <span {...rest}>{text || text === 0 ? (dontTranslate ? text : text) : null}</span>
);

export default Text;

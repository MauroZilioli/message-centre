import React from 'react';
import PropTypes from 'prop-types';

const Sitecontent = ({ children }) => (
  <div className="sh-sitecontent">{children}</div>
);

Sitecontent.defaultProps = {
  children: undefined,
};

Sitecontent.propTypes = {
  children: PropTypes.node,
};

export default Sitecontent;

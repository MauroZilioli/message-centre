import React from 'react';
import PropTypes from 'prop-types';

const Sitemenulogo = ({ children }) => (
  <div className="sh-sitemenulogo">{children}</div>
);

Sitemenulogo.defaultProps = {
  children: undefined,
};

Sitemenulogo.propTypes = {
  children: PropTypes.node,
};

export default Sitemenulogo;

import React from 'react';
import PropTypes from 'prop-types';

const Siteheader = ({ children }) => (
  <div className="sh-siteheader">{children}</div>
);

Siteheader.defaultProps = {
  children: undefined,
};

Siteheader.propTypes = {
  children: PropTypes.node,
};

export default Siteheader;

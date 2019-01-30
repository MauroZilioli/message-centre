import React from 'react';
import PropTypes from 'prop-types';

const Wizardstep = ({ children }) => (
  <div className="sh-wizardstep">
    { children }
  </div>
);

Wizardstep.defaultProps = {
  name: '',
  isValid: undefined,
  children: undefined,
  onPrev: undefined,
  onNext: undefined,
};

Wizardstep.propTypes = {
  name: PropTypes.string,
  isValid: PropTypes.func,
  children: PropTypes.node,
  onPrev: PropTypes.func,
  onNext: PropTypes.func,
};

export default Wizardstep;

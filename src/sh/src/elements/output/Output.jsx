import React from 'react';
import PropTypes from 'prop-types';

import { join } from '../../utils/element';

import './Output.scss';

const Output = (props) => {
  const {
    value,
    className,
  } = props;

  return (
    <input
      type="text"
      readOnly
      className={join('sh-output', className)}
      value={value}
      />
  );
};

Output.defaultProps = {
  value: undefined,
  className: undefined,
};

Output.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
};

export default Output;

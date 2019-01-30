import React from 'react';
import PropTypes from 'prop-types';

import { join } from '../../utils/element';

import './Label.scss';

const Label = (props) => {
  const {
    children,
    className,
    htmlFor,
  } = props;

  return (
    <label
      className={join('sh-label', className)}
      htmlFor={htmlFor}
      >
      { children }
    </label>
  );
};

Label.defaultProps = {
  children: undefined,
  className: undefined,
};

Label.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  htmlFor: PropTypes.string,
};

export default Label;

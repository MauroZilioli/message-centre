import React from 'react';
import PropTypes from 'prop-types';

import { join } from './../../utils/element';

const Selectboxitem = ({ value, className, children, ...rest }) => (
  <option
    value={value}
    className={join('sh-selectboxitem', className)}
    {...rest}
    >
    {children}
  </option>
);

Selectboxitem.defaultProps = {
  className: undefined,
  children: undefined,
};

Selectboxitem.propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Selectboxitem;

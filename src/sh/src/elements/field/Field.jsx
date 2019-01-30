import React from 'react';
import PropTypes from 'prop-types';

import { join } from '../../utils/element';

import './Field.scss';

const Field = (props) => {
  const {
    children,
    className,
    ...rest
  } = props;

  return (
    <div className={join('sh-field', className)} {...rest}>
      { children }
    </div>
  );
};

Field.defaultProps = {
  children: undefined,
  className: undefined,
};

Field.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Field;

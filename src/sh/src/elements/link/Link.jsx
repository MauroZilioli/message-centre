import React from 'react';
import PropTypes from 'prop-types';
import { Link as ForeignRouterLink } from 'react-router-dom';

import { join } from '../../utils/element';

import './Link.scss';

const Link = (props) => {
  const {
    children,
    className,
    ...rest
  } = props;

  return (
    <ForeignRouterLink
      className={join('sh-link', className)}
      {...rest}
      >
      { children }
    </ForeignRouterLink>
  );
};

Link.defaultProps = {
  children: undefined,
  className: undefined,
};

Link.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Link;

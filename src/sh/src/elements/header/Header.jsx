import React from 'react';
import PropTypes from 'prop-types';

import { join } from '../../utils/element';

import './Header.scss';

const Header = (props) => {
  const {
    children,
    className,
  } = props;

  return (
    <header className={join('sh-header', className)}>
      { children }
    </header>
  );
};

Header.defaultProps = {
  children: undefined,
  className: undefined,
};

Header.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Header;

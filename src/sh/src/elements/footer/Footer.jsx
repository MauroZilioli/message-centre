import React from 'react';
import PropTypes from 'prop-types';

import { join } from '../../utils/element';

import './Footer.scss';

const Footer = (props) => {
  const {
    children,
    className,
  } = props;

  return (
    <footer className={join('sh-footer', className)}>
      { children }
    </footer>
  );
};

Footer.defaultProps = {
  children: undefined,
  className: undefined,
};

Footer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Footer;

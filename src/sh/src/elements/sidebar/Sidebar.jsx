import React from 'react';
import PropTypes from 'prop-types';

import { join } from '../../utils/element';

import './Sidebar.scss';

const Sidebar = (props) => {
  const {
    children,
    className,
  } = props;

  return (
    <div className={join('sh-sidebar', className)}>
      { children }
    </div>
  );
};

Sidebar.defaultProps = {
  children: undefined,
  className: undefined,
};

Sidebar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Sidebar;

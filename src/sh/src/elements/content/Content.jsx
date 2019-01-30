import React from 'react';
import PropTypes from 'prop-types';

import { join } from '../../utils/element';

import './Content.scss';

const Content = (props) => {
  const {
    children,
    className,
  } = props;

  return (
    <div className={join('sh-content', className)}>
      { children }
    </div>
  );
};

Content.defaultProps = {
  children: undefined,
  className: undefined,
};

Content.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Content;

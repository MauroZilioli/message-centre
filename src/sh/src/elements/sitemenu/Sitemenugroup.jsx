import React from 'react';
import PropTypes from 'prop-types';
import {join, slot} from '../../utils/element';

const Sitemenugroup = (props) => {
  const {
      children,
      className,
  } = props;

  return (
    <ul className={join('sh-sitemenugroup', className)}>
      { slot(children, ['UserGuard', 'Sitemenuitem', 'Sitemenulogo']) }
    </ul>
  );
};

Sitemenugroup.defaultProps = {
    children: undefined,
    className: undefined,
};

Sitemenugroup.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

export default Sitemenugroup;

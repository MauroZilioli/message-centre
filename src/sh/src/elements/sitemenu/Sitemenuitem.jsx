import React from 'react';
import PropTypes from 'prop-types';

const Sitemenuitem = (props) => {
  const {
    children,
  } = props;

  return (
    <li className="sh-sitemenuitem">
      { children }
    </li>
  );
};

Sitemenuitem.defaultProps = {
  children: null,
};

Sitemenuitem.propTypes = {
  children: PropTypes.node,
};

export default Sitemenuitem;

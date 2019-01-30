import React from 'react';
import PropTypes from 'prop-types';
import { slot } from '../../utils/element';

import './Sitemenu.scss';

const Sitemenu = (props) => {
  const {
    children,
  } = props;

  return (
    <nav className="sh-sitemenu">
      { slot(children, ['UserGuard', 'Sitemenugroup', 'Sitemenulogo']) }
    </nav>
  );
};

Sitemenu.defaultProps = {
  children: undefined,
};

Sitemenu.propTypes = {
  children: PropTypes.node,
};

export default Sitemenu;

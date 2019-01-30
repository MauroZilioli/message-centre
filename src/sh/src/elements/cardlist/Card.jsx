import React from 'react';
import PropTypes from 'prop-types';

import { join } from './../../utils/element';

const Card = ({ className, children, ...rest }) => (
  <div
    className={join('sh-card', className)}
    {...rest}
    >
    <div className="sh-card_content">{children}</div>
  </div>
);

Card.defaultProps = {
  className: undefined,
  children: undefined,
};

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Card;

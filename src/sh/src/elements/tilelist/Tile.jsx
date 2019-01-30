import React from 'react';
import PropTypes from 'prop-types';

import { join } from './../../utils/element';

const Tile = ({ className, children, ...rest }) => (
  <div
    className={join('sh-tile', className)}
    {...rest}
    >
    <div className="sh-tile_container">
      <div className="sh-tile_image">
        <div className="sh-tile_overlay" />
      </div>
      <div className="sh-tile_content">{children}</div>
    </div>
  </div>
);

Tile.defaultProps = {
  className: undefined,
  children: undefined,
};

Tile.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Tile;

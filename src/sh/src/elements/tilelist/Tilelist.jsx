import React from 'react';
import PropTypes from 'prop-types';

import { join } from '../../utils/element';

import Tile from './Tile';
import './Tilelist.scss';

class Tilelist extends React.Component {

  constructor() {
    super();

    this.state = {

    };
  }

  render() {
    const {
      items,
      children,
      className,
    } = this.props;

    return (
      <div
        className={join('sh-tilelist', className)}
        >
        { items
          ? items.map((item, index) => <Tile key={`tile-${index}`}>{ item.content }</Tile>)
          : children }
      </div>
    );
  }
}

Tilelist.defaultProps = {
  items: undefined,
  children: undefined,
  className: undefined,
};

Tilelist.propTypes = {
  items: PropTypes.array,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Tilelist;

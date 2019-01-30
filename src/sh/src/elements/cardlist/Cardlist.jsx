import React from 'react';
import PropTypes from 'prop-types';

import { join } from '../../utils/element';

import Card from './Card';
import './Cardlist.scss';

class Cardlist extends React.Component {

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
        className={join('sh-cardlist', className)}
        >
        { items
          ? items.map((item, index) => <Card key={`card-${index}`}>{ item.content }</Card>)
          : children }
      </div>
    );
  }
}

Cardlist.defaultProps = {
  items: undefined,
  children: undefined,
  className: undefined,
};

Cardlist.propTypes = {
  items: PropTypes.array,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Cardlist;

import React from 'react';
import PropTypes from 'prop-types';

import { join, slot } from '../../utils/element';

import Taglistitem from './Taglistitem.jsx';
import './Taglist.scss';

class Taglist extends React.Component {

  handleItemActivate(item) {
    if (!item.disabled && this.props.onItemActivate) {
      this.props.onItemActivate(item);
    }
  }

  render() {
    const {
      children,
      className,
      items,
      onItemActivate,
      type,
    } = this.props;

    return (
      <div
        className={join('sh-taglist', className)}
        role="listbox"
        type={type}
        >
        { items
          ? items.map((item, index) => (
            <Taglistitem
              key={`tag-${index}`}
              disabled={!!item.disabled}
              onActivate={() => this.handleItemActivate(item)}
              >{ item.content }</Taglistitem>))
          : slot(children, 'Taglistitem')
        }
      </div>
    );
  }
}

Taglist.defaultProps = {
  children: undefined,
  className: undefined,
  type: undefined,
  items: undefined,
  onItemActivate: undefined,
};

Taglist.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.string,
  items: PropTypes.array,
  onItemActivate: PropTypes.func,
};

export default Taglist;

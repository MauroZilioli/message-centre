import React from 'react';
import PropTypes from 'prop-types';

import { join } from '../../utils/element';

class Taglistitem extends React.Component {
  handleClick() {
    this.activate();
  }

  handleKeyDown(event) {
    if (event.keyCode === 13) {
      this.activate();
    }
  }

  activate() {
    if (this.props.onActivate) {
      this.props.onActivate();
    }
  }

  render() {
    const {
      children,
      className,
      disabled,
    } = this.props;

    return (
      <div
        className={join('sh-taglistitem', className)}
        onClick={event => this.handleClick(event)}
        onKeyDown={event => this.handleKeyDown(event)}
        role="option"
        aria-selected={false}
        tabIndex={disabled ? null : 0}
        disabled={disabled}
        >
        { children }
      </div>
    );
  }
}

Taglistitem.defaultProps = {
  children: undefined,
  className: undefined,
  onActivate: undefined,
  disabled: undefined,
};

Taglistitem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onActivate: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Taglistitem;

import React from 'react';
import PropTypes from 'prop-types';

import { join } from './../../utils/element';

import './Button.scss';

class Button extends React.Component {
  handleClick(event) {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  }

  render() {
    const {
      children,
      className,
      disabled,
      icon,
      type,
      style,
    } = this.props;

    const classNameIcon = icon ? ['sh-button-icon', `sh-button-icon--${icon}`] : [];
    return (
      <button
        type={type === 'submit' ? 'submit' : 'button'}
        disabled={disabled}
        onClick={event => this.handleClick(event)}
        className={join('sh-button', `sh-button--${type}`, ...classNameIcon, className)}
        style={style}
        >
        {children}
      </button>
    );
  }
}

Button.defaultProps = {
  style: undefined,
  className: undefined,
  children: undefined,
  icon: undefined,
  type: 'button',
  disabled: false,
  onClick: undefined,
};

Button.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.string,
  type: PropTypes.node,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;

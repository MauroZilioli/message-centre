import React from 'react';
import PropTypes from 'prop-types';

import { join } from './../../utils/element';

import './Checkbox.scss';

class Checkbox extends React.Component {
  constructor() {
    super();

    this.state = {

    };
  }

  handleChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  render() {
    const {
      checked,
      className,
      onChange,
      children,
      ...rest
    } = this.props;

    return (
      <label className={join('sh-checkbox', className)}>
        <input
          type="checkbox"
          checked={checked}
          onChange={event => this.handleChange(event)}
          className="sh-checkbox_input"
          {...rest}
          />
        <span className="sh-checkbox_icon" />
        <span className="sh-checkbox_content">{children}</span>
      </label>
    );
  }
}

Checkbox.defaultProps = {
  id: undefined,
  onChange: undefined,
  className: undefined,
  children: undefined,
};

Checkbox.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
  checked: PropTypes.bool.isRequired,
};

export default Checkbox;

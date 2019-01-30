import React from 'react';
import PropTypes from 'prop-types';

import { join } from './../../utils/element';

import './Radiobox.scss';

class Radiobox extends React.Component {
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
      children,
      onChange,
      ...rest
    } = this.props;

    return (
      <label className={join('sh-radiobox', className)}>
        <input
          type="radio"
          checked={checked}
          onChange={event => this.handleChange(event)}
          className="sh-radiobox_input"
          {...rest}
          />
        <span className="sh-radiobox_icon" />
        <span className="sh-radiobox_content">{children}</span>
      </label>
    );
  }
}

Radiobox.defaultProps = {
  id: undefined,
  onChange: undefined,
  className: undefined,
  children: undefined,
};

Radiobox.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
  checked: PropTypes.bool.isRequired,
};

export default Radiobox;

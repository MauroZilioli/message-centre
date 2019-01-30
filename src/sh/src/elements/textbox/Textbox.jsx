import React from 'react';
import PropTypes from 'prop-types';

import { join } from './../../utils/element';

import './Textbox.scss';

class Textbox extends React.Component {
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
      type,
      value,
      className,
      onChange,
      ...rest
    } = this.props;

    return (
      <input
        type={type}
        value={value}
        autoComplete={type === 'password' ? 'new-password' : 'no'}
        onChange={event => this.handleChange(event)}
        className={join('sh-textbox', `sh-textbox--${type}`, className)}
        {...rest}
        />
    );
  }
}

Textbox.defaultProps = {
  id: undefined,
  type: 'text',
  disabled: undefined,
  onChange: undefined,
  className: undefined,
};

Textbox.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
};

export default Textbox;

import './Spinner.scss';

import React from 'react';
import PropTypes from 'prop-types';

import { join } from './../../utils/element';

class Spinner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasFocus: false,
    };
  }

  setValue(value) {
    const {
      onChange,
    } = this.props;

    if (value !== this.props.value) {
      if (onChange) {
        onChange({ target: { value } });
      }
    }
  }

  step(step) {
    let value = this.props.value;
    if (value === null || value === undefined || value === '') {
      value = '0';
    }

    const newValue = (value * 1) + (step * 1);
    if (this.isValid(newValue)) {
      this.setValue(newValue.toString());
    }
  }

  tryIncrement() {
    const {
      step,
    } = this.props;

    this.step(step * 1);
  }

  tryDecrement() {
    const {
      step,
    } = this.props;

    this.step(step * -1);
  }

  isValid(value) {
    const {
      min,
      max,
    } = this.props;

    return value === '' || (value * 1 <= max * 1 && value * 1 >= min * 1);
  }

  handleChange(event) {
    const value = event.target.value;
    if (this.isValid(value)) {
      this.setValue(value);
    } else {
      event.preventDefault();
    }
  }

  handleKeyDown(event) {
    if (event.keyCode === 38) {
      event.preventDefault();
      this.tryIncrement();
    } else if (event.keyCode === 40) {
      event.preventDefault();
      this.tryDecrement();
    }
  }

  handleIncrementButtonClick() {
    this.tryIncrement();
  }

  handleDecrementButtonClick() {
    this.tryDecrement();
  }

  render() {
    const {
      id,
      name,
      value,
      step,
      className,
      onChange,
      disabled,
      ...rest
    } = this.props;

    const canDecrement = this.isValid((value * 1) - (step * 1));
    const canIncrement = this.isValid((value * 1) + (step * 1));

    return (
      <div
        className={join('sh-spinner', className,
          disabled ? 'sh-spinner--disabled' : null,
          value === '' ? 'sh-spinner--empty' : null,
          this.state.hasFocus ? 'sh-spinner--focused' : null)}
        >
        <button
          onMouseDown={e => e.preventDefault()}
          onClick={() => this.handleDecrementButtonClick()}
          disabled={disabled || !canDecrement}
          tabIndex="-1"
          className="sh-spinner_button sh-spinner_button--decrement"
          />
        <input
          id={id}
          type="text"
          name={name}
          value={value}
          disabled={disabled}
          onKeyDown={e => this.handleKeyDown(e)}
          onChange={e => this.handleChange(e)}
          onFocus={() => this.setState({ hasFocus: true })}
          onBlur={() => this.setState({ hasFocus: false })}
          className="sh-spinner_input"
          {...rest}
          />
        <button
          onMouseDown={e => e.preventDefault()}
          onClick={() => this.handleIncrementButtonClick()}
          disabled={disabled || !canIncrement}
          tabIndex="-1"
          className="sh-spinner_button sh-spinner_button--increment"
          />
      </div>
    );
  }
}

Spinner.defaultProps = {
  id: undefined,
  name: undefined,
  disabled: undefined,
  value: '',
  className: undefined,
  onChange: undefined,
  max: Infinity,
  min: -Infinity,
  step: 1,
};

Spinner.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default Spinner;

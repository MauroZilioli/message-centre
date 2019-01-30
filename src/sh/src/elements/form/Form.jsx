import React from 'react';
import PropTypes from 'prop-types';

import { join, slot } from '../../utils/element';

import './Form.scss';

class Form extends React.Component {

  handleSubmit(event) {
    const {
      onSubmit,
    } = this.props;

    event.preventDefault();

    if (onSubmit) {
      onSubmit(event);
    }
  }

  render() {
    const {
      children,
      className,
    } = this.props;

    return (
      <form
        onSubmit={event => this.handleSubmit(event)}
        className={join('sh-page', 'sh-form', className)}
        >
        { slot(children, 'Header') }
        { slot(children, 'Content') }
        { slot(children, 'Footer') }
      </form>
    );
  }
}

Form.defaultProps = {
  children: undefined,
  className: undefined,
  onSubmit: undefined,
};

Form.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default Form;

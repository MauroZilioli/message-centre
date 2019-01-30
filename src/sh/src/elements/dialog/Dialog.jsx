import React from 'react';
import PropTypes from 'prop-types';

import { slot, join } from '../../utils/element';

import './Dialog.scss';

class Dialog extends React.Component {
  constructor() {
    super();

    this.state = {

    };
  }

  handleSubmit(event) {
    const {
      onSubmit,
    } = this.props;

    event.preventDefault();

    if (onSubmit) {
      onSubmit();
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
        className={join('sh-dialog', className)}
        >
        { slot(children, 'Header') }
        { slot(children, 'Content') }
        { slot(children, 'Footer') }
      </form>
    );
  }
}

Dialog.defaultProps = {
  children: undefined,
  className: undefined,
  onSubmit: undefined,
};

Dialog.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default Dialog;

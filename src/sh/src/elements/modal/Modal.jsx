import React from 'react';
import PropTypes from 'prop-types';
import ForeignModal from 'react-modal';

import { join } from './../../utils/element';

import './Modal.scss';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  handleRequestClose() {
    const onClose = this.props.onClose;
    if (onClose) {
      onClose();
    }
  }

  render() {
    const {
      children,
      className,
      closeable,
      isOpen,
    } = this.props;

    return (
      <ForeignModal
        isOpen={isOpen}
        className={join('sh-modal', className)}
        overlayClassName="sh-modal-overlay"
        contentLabel=""
        onRequestClose={() => this.handleRequestClose()}
        >
        {closeable && <button className="sh-modal_button-close" onClick={() => this.handleRequestClose()} />}
        {children}
      </ForeignModal>
    );
  }
}

Modal.defaultProps = {
  children: undefined,
  className: undefined,
  onClose: undefined,
  closeable: undefined,
  isOpen: false,
};

Modal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClose: PropTypes.func,
  closeable: PropTypes.bool,
  isOpen: PropTypes.bool,
};

Modal.displayName = 'Modal(react-modal:Modal)';

export default Modal;

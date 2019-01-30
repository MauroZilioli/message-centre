import React from 'react';
import PropTypes from 'prop-types';

import Dialog from './../dialog/Dialog';
import Header from './../header/Header';
import Content from './../content/Content';
import Footer from './../footer/Footer';
import Button from './../button/Button';

import { join } from './../../utils/element';

import './ConfirmDialog.scss';

class ConfirmDialog extends React.Component {
  constructor() {
    super();

    this.state = {

    };
  }

  handleRejectClick() {
    if (this.props.onReject) {
      this.props.onReject();
    }
  }

  handleAcceptClick() {
    if (this.props.onAccept) {
      this.props.onAccept();
    }
  }

  render() {
    const {
      className,
      title,
      ...rest
    } = this.props;

    return (
      <Dialog
        className={join('sh-confirmdialog', className)}
        {...rest}
        >
        <Header>
          <h2>{title}</h2>
        </Header>
        <Content>
          { this.props.children }
        </Content>
        <Footer>
          <Button
            className="sh-confirmdialog_button-reject"
            type="cancel"
            onClick={event => this.handleRejectClick(event)}
            >Cancel</Button>
          <Button
            className="sh-confirmdialog_button-accept"
            type="submit"
            onClick={event => this.handleAcceptClick(event)}
            >OK</Button>
        </Footer>
      </Dialog>
    );
  }
}

ConfirmDialog.defaultProps = {
  children: undefined,
  className: undefined,
  title: undefined,
  onAccept: undefined,
  onReject: undefined,
};

ConfirmDialog.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string,
  onAccept: PropTypes.func,
  onReject: PropTypes.func,
};

export default ConfirmDialog;

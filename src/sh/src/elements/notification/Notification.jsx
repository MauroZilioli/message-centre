import React from 'react';
import PropTypes from 'prop-types';

import { join } from './../../utils/element';

import './Notification.scss';

class Notification extends React.Component {
  constructor() {
    super();

    this.state = {
      // mouseover: false,
      dismissed: false,
    };
  }

  componentWillMount() {
    this.timeout = setTimeout(() => {
//      if (this.state.mouseover) {
//        this.timeout = clearTimeout(this.timeout);
//      } else {
      this.timeout = 0;
      this.setState({ dismissed: true });
//      }
    }, 10 * 1000);
  }

  componentWillUnmount() {
    if (this.timeout) {
      this.timeout = clearTimeout(this.timeout);
    }
  }

  handleDismissButtonClick() {
    if (this.timeout) {
      this.timeout = clearTimeout(this.timeout);
    }
    this.setState({
      dismissed: true,
    });
  }

  // handleMouseOver() {
  //   this.setState({
  //     mouseover: true,
  //   });
  // }

  // handleMouseOut() {
  //   this.setState({
  //     mouseover: false,
  //   });
  //   if (!this.timeout) {
  //     this.setState({
  //       dismissed: true,
  //     });
  //   }
  // }

  render() {
    const {
      dismissed,
    } = this.state;

    return (
      <div
        style={{ display: dismissed ? 'none' : '' }}
        className={join('sh-notification', `sh-notification--${this.props.type}`, this.props.className)}
        >
        <button
          type="button"
          className="sh-notification_button-dismiss"
          onClick={() => this.handleDismissButtonClick()}
          />
        <div className="sh-notification_content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Notification.defaultProps = {
  children: undefined,
  className: undefined,
  type: 'info',
};

Notification.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.string,
};

export default Notification;

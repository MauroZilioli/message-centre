import React from 'react';
import PropTypes from 'prop-types';

import './Loading.scss';

// Component stays hidden for .5s and then reveals
class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: true,
    };
  }

  componentWillMount() {
    this.timeout = setTimeout(() => {
      this.timeout = 0;
      this.setState({ hidden: false });
    }, 500);
  }

  componentWillUnmount() {
    if (this.timeout) {
      this.timeout = clearTimeout(this.timeout);
    }
  }

  render() {
    const {
      hidden,
    } = this.state;

    const {
      children,
    } = this.props;
    return (
      <div className="sh-loading" style={{ display: hidden ? 'none' : '' }}>{children}</div>
    );
  }
}

Loading.defaultProps = {
  children: undefined,
};

Loading.propTypes = {
  children: PropTypes.node,
};

export default Loading;

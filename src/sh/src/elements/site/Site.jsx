import React from 'react';
import PropTypes from 'prop-types';

import { join } from '../../utils/element';

import './Site.scss';

class Site extends React.Component {

  constructor() {
    super();

    this.onScroll = (event) => {
      this.setState({
        scrolled: event.target.documentElement.scrollTop > 20,
      });
    };

    this.state = {
      scrolled: false,
    };
  }

  componentDidMount() {
    this.domRef.ownerDocument.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    this.domRef.ownerDocument.removeEventListener('scroll', this.onScroll);
  }

  render() {
    const {
      children,
    } = this.props;

    const {
      scrolled,
    } = this.state;

    return (
      <div
        className={join('sh-site', scrolled && 'sh-site--scrolled')}
        ref={(ref) => { this.domRef = ref; }}
        >
        { children }
      </div>
    );
  }
}

Site.defaultProps = {
  children: null,
};

Site.propTypes = {
  children: PropTypes.node,
};

export default Site;

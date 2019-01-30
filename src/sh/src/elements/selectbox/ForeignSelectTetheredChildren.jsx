import React from 'react';
import PropTypes from 'prop-types';

export default class ForeignSelectTetheredChildren extends React.Component {
  componentDidMount() {
    this.props.position();
  }

  componentDidUpdate() {
    this.props.position();
  }

  render() {
    return this.props.children;
  }
}

ForeignSelectTetheredChildren.defaultProps = {
  position: undefined,
  children: undefined,
};


ForeignSelectTetheredChildren.propTypes = {
  position: PropTypes.func,
  children: PropTypes.object,
};

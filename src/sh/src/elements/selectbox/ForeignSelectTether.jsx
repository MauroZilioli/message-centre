import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Tether from 'tether';
import ForeignSelectTetheredChildren from './ForeignSelectTetheredChildren';

export default class ForeignSelectTether extends React.Component {
  constructor(props) {
    super(props);
    this.position = this.position.bind(this);
  }

  componentDidMount() {
    this.tetherContainer = document.createElement('div');
    this.tetherContainer.classList.add('sh-selectbox-tether');
    document.body.appendChild(this.tetherContainer);
    this.renderTetheredContent();
  }

  componentDidUpdate() {
    this.renderTetheredContent();
  }

  componentWillUnmount() {
    this.destroyTetheredContent();
  }

  position() {
    if (!this.tether) {
      this.tether = new Tether({
        ...this.props.options,
        element: this.tetherContainer,
        target: this.props.target,
      });
    }

    if (this.props.matchWidth) {
      this.tetherContainer.style.width = `${this.props.target.clientWidth}px`;
    }

    this.tether.position();
  }

  destroyTetheredContent() {
    ReactDOM.unmountComponentAtNode(this.tetherContainer);
    this.tether.destroy();
    document.body.removeChild(this.tetherContainer);
  }

  renderTetheredContent() {
    ReactDOM.render(
      <ForeignSelectTetheredChildren
        target={this.props.target}
        position={this.position}
        >
        {this.props.children}
      </ForeignSelectTetheredChildren>,
      this.tetherContainer,
    );
  }

  render() {
    return null;
  }
}

ForeignSelectTether.defaultProps = {
  target: undefined,
  children: undefined,
  matchWidth: undefined,
  options: undefined,
};

ForeignSelectTether.propTypes = {
  target: PropTypes.object,
  children: PropTypes.object,
  matchWidth: PropTypes.bool,
  options: PropTypes.object,
};

import React from 'react';
import PropTypes from 'prop-types';

import { join } from '../../utils/element';

import './Panel.scss';

class Panel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
    };
  }

  toggle() {
    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    const {
      children,
      className,
      title,
    } = this.props;

    const {
      open,
    } = this.state;

    return (
      <div className={join('sh-panel', !open && 'sh-panel--collapsed', className)}>
        <div className="sh-panel_header">
          <div className="sh-panel_header_text">
            { title }
          </div>
          <button className="sh-panel_header_button" onClick={() => this.toggle()} />
        </div>
        <div className="sh-panel_content">
          { children }
        </div>
      </div>
    );
  }
}

Panel.defaultProps = {
  children: undefined,
  className: undefined,
  title: undefined,
};

Panel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string,
};

export default Panel;

import React from 'react';
import PropTypes from 'prop-types';

import { join } from '../../utils/element';

import './Image.scss';

const Image = (props) => {
  const {
    className,
    src,
  } = props;

  return (
    <div className={join('sh-image', className)}>
      <img src={src} alt="" className="sh-image_image" />
    </div>
  );
};

Image.defaultProps = {
  className: undefined,
};

Image.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
};

export default Image;

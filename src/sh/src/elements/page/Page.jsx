import React from 'react';
import PropTypes from 'prop-types';

import { join, slot } from '../../utils/element';

import './Page.scss';

const Page = (props) => {
  const {
    children,
    className,
  } = props;

  return (
    <article className={join('sh-page', className)}>
      { slot(children, 'Sidebar') }
      { slot(children, 'Header') }
      { slot(children, 'Content') }
      { slot(children, 'Footer') }
    </article>
  );
};

Page.defaultProps = {
  children: undefined,
  className: undefined,
};

Page.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Page;

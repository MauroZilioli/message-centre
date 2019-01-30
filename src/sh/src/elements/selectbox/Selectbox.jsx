import React from 'react';
import PropTypes from 'prop-types';
import 'react-select/dist/react-select.css';
import ForeignSelectWrap from './ForeignSelectWrap';

import './Selectbox.scss';

import { join } from './../../utils/element';

const Selectbox = ({ id, value, onChange, items, children, className, required, ...rest }) => {
  let options = [];
  if (items) {
    options = Object.keys(items).map(key => ({ value: key, label: items[key] }));
  } else if (children && Array.isArray(children)) {
    options = children.map(child => ({ value: child.props.value, label: child.props.children }));
  }

  const isRequired = required === 'required' || required;
  const isInvalid = isRequired && value === '';

  return (
    <ForeignSelectWrap
      id={id}
      value={value}
      options={options}
      clearable={false}
      onChange={option => onChange && onChange({ target: option })}
      className={join('sh-selectbox', className, isInvalid && 'sh-selectbox--invalid')}
      required={isRequired}
      {...rest}
      />);
};

Selectbox.defaultProps = {
  id: undefined,
  onChange: undefined,
  onOpen: undefined,
  items: undefined,
  children: undefined,
  className: undefined,
  searchable: false,
  required: false,
};

Selectbox.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onOpen: PropTypes.func,
  items: PropTypes.object,
  children: PropTypes.node,
  className: PropTypes.string,
  searchable: PropTypes.bool,
  required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

Selectbox.displayName = 'Selectbox(react-select:Select)';

export default Selectbox;

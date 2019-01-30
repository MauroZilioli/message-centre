import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const UserRoute = ({ user, role, component: Component, ...rest }) => {
  if (user) {
    if (role === '*' || role.split(',').includes(user.role)) {
      return <Route {...rest} render={props => <Component {...props} />} />;
    }
    return <div>Not authorized to view current section</div>;
  }
  return <Redirect to={{ pathname: '/', state: { from: rest.location } }} />;
};

UserRoute.defaultProps = {
  user: undefined,
  role: '',
};

UserRoute.propTypes = {
  user: PropTypes.object,
  role: PropTypes.string,
  component: PropTypes.func.isRequired,
};

export default UserRoute;

import PropTypes from 'prop-types';

const UserGuard = ({ user, role, children }) => {
  if (user && (role === '*' || role.split(',').includes(user.role))) {
    return children;
  }
  return null;
};

UserGuard.defaultProps = {
  user: undefined,
  role: '',
};

UserGuard.propTypes = {
  user: PropTypes.object,
  role: PropTypes.string,
};

export default UserGuard;

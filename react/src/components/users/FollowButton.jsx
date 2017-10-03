import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const propTypes = {
  authenticatedUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

const defaultProps = {
  authenticatedUser: undefined,
};

const FollowButton = (props) => {
  const { authenticatedUser, user } = props;

  if (authenticatedUser) {
    if (authenticatedUser.id !== user.id) {
      return (<Button raised color="primary">Follow</Button>);
    }
    return null;
  }
  return (<Typography type="body1">You need to login to follow someone</Typography>);
};

FollowButton.propTypes = propTypes;
FollowButton.defaultProps = defaultProps;
export default FollowButton;

import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardActions, CardHeader } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router-dom';
import Typography from 'material-ui/Typography';
import { createFragmentContainer, graphql } from 'react-relay';
import FollowButton from './FollowButton';

const propTypes = {
  authenticatedUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }).isRequired,
};

const defaultProps = {
  authenticatedUser: undefined,
};

class MiniUser extends React.Component { // eslint-disable-line

  render() {
    const { authenticatedUser, user } = this.props;
    const { name, username, avatarUrl } = user;
    return (
      <div>
        <Card raised>
          <CardHeader
            avatar={
              <Avatar alt={name} src={avatarUrl} />
            }
            title={
              <div>
                <Typography type="body1">
                  {name}
                </Typography>
              </div>
            }
            subheader={
              <Link to={`/users/${user.id}`}>
                <Typography type="body2">
                  @{username}
                </Typography>
              </Link>
            }
          />
          <CardActions>
            <FollowButton authenticatedUser={authenticatedUser} user={user} />
          </CardActions>
        </Card>
      </div>
    );
  }
}

MiniUser.propTypes = propTypes;
MiniUser.defaultProps = defaultProps;

export default createFragmentContainer(MiniUser, graphql`
  fragment MiniUser_user on User {
    id
    username
    name
    avatarUrl
  }
`);

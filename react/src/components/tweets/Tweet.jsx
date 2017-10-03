import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import { ThumbUp, ThumbDown } from 'material-ui-icons';
import NumbericLabel from 'react-pretty-numbers';
import { createFragmentContainer, graphql } from 'react-relay';
import TimeAgo from 'react-timeago';
import { withStyles } from 'material-ui/styles';

import UpvoteMutation from '../../mutations/tweets/Upvote';
import DownvoteMutation from '../../mutations/tweets/Downvote';

const styles = () => ({
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const propTypes = {
  authenticatedUser: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  tweet: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    likeCount: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const contextTypes = {
  relay: PropTypes.object.isRequired,
};

const defaultProps = {
  authenticatedUser: null,
};

class Tweet extends React.Component { // eslint-disable-line
  handleDownvoteClick = () => {
    DownvoteMutation.commit(this.context.relay.environment, this.props.tweet);
  };

  handleUpvoteClick = () => {
    UpvoteMutation.commit(this.context.relay.environment, this.props.tweet);
  };

  render() {
    const { text, likeCount, createdAt, user } = this.props.tweet;
    const { classes } = this.props;

    return (
      <div>
        <Card raised>
          <CardHeader
            avatar={
              <Avatar alt={user.name} src={user.avatarUrl} />
            }
            title={
              <div>
                <Typography type="body1">
                  {user.name}
                </Typography>
                <Link to={`/users/${user.id}`}>
                  <Typography type="body2">
                    @{user.username}
                  </Typography>
                </Link>
              </div>
            }
            subheader={<TimeAgo date={createdAt} />}
          />
          <CardContent>
            <Typography>
              {text}
            </Typography>
          </CardContent>
          <CardActions className={classes.controls}>
            {
              (this.props.authenticatedUser)
                ? (
                  <IconButton onClick={this.handleDownvoteClick}>
                    <ThumbDown />
                  </IconButton>
                )
                : null
            }
            <Typography>
              <NumbericLabel
                params={{ shortFormat: true }}
              >
                {likeCount}
              </NumbericLabel>
            </Typography>
            {
              (this.props.authenticatedUser)
                ? (
                  <IconButton onClick={this.handleUpvoteClick}>
                    <ThumbUp />
                  </IconButton>
                )
                : null
            }
          </CardActions>
        </Card>
      </div>
    );
  }
}

Tweet.propTypes = propTypes;
Tweet.defaultProps = defaultProps;
Tweet.contextTypes = contextTypes;

export default withStyles(styles)(createFragmentContainer(Tweet, graphql`
  fragment Tweet_tweet on Tweet {
    id
    text
    likeCount
    createdAt
    user {
      id
      username
      name
      avatarUrl
    }
  }
`));

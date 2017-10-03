import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { createFragmentContainer, graphql } from 'react-relay';

import Tweet from './Tweet';

const styles = theme => ({
  tweet: {
    marginBottom: theme.spacing.unit * 2,
  },
});

const propTypes = {
  authenticatedUser: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  tweets: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const defaultProps = {
  authenticatedUser: null,
};

class TweetList extends React.Component { //eslint-disable-line
  render() {
    const { tweets, classes, authenticatedUser } = this.props;
    return (
      <div>
        {tweets.map(tweet => (
          <div key={tweet.id} className={classes.tweet}>
            <Tweet authenticatedUser={authenticatedUser} tweet={tweet} />
          </div>
        ))}
      </div>

    );
  }
}

TweetList.propTypes = propTypes;
TweetList.defaultProps = defaultProps;

export default withStyles(styles)(createFragmentContainer(TweetList, graphql`
  fragment TweetList_tweets on Tweet @relay(plural: true) {
    id
    ...Tweet_tweet
  }
`));

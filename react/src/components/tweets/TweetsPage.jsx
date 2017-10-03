import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { graphql, QueryRenderer } from 'react-relay';
import TweetList from './TweetList';
import TweetForm from './TweetForm';
import MiniUser from '../users/MiniUser';
import relayEnvironment from '../../relayEnvironment';

const TweetsPageQuery = graphql`
  query TweetsPageQuery {
    viewer {
      me {
        id
      }
      feed {
        ...TweetList_tweets
      }
      suggestedUsers {
        id
        ...MiniUser_user
      }
    }
  }
`;

const propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const styles = theme => ({
  miniUser: {
    marginBottom: theme.spacing.unit * 3,
  },
  title: {
    marginBottom: theme.spacing.unit * 3,
  },
});

class TweetsPage extends React.Component { //eslint-disable-line
  render() {
    const { classes } = this.props;
    return (
      <QueryRenderer
        environment={relayEnvironment}
        query={TweetsPageQuery}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          }
          else if (props) {
            return (
              <Grid container spacing={16}>
                <Grid item xs={3}>
                  <Typography align="center" className={classes.title} type="title">Suggested user</Typography>
                  <div>
                    {props.viewer.suggestedUsers.map(user => (
                      <div key={user.id} className={classes.miniUser}>
                        <MiniUser authenticatedUser={props.viewer.me} user={user} />
                      </div>
                    ))}
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="center" className={classes.title} type="title">Feed</Typography>
                  <TweetList authenticatedUser={props.viewer.me} tweets={props.viewer.feed} />
                </Grid>
                <Grid item xs={3}>
                  <Typography align="center" className={classes.title} type="title">New tweet</Typography>
                  <TweetForm relayEnvironment={relayEnvironment} />
                </Grid>
              </Grid>
            );
          }
          return <div>Loading</div>;
        }}
      />
    );
  }
}

TweetsPage.propTypes = propTypes;

export default withStyles(styles)(TweetsPage);

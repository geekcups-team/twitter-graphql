import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { graphql, QueryRenderer } from 'react-relay';
import { withStyles } from 'material-ui/styles';
import TweetList from '../tweets/TweetList';
import relayEnviroment from '../../relayEnvironment';
import FollowButton from './FollowButton';

const styles = theme => ({
  coverImage: {
    height: 350,
    backgroundPositionY: 'top',
  },
  bigAvatar: {
    width: 80,
    height: 80,
  },
  subheader: {
    background: theme.palette.background.paper,
  },
  title: {
    marginBottom: theme.spacing.unit * 3,
  },
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});

const UserPageQuery = graphql`
  query UserPageQuery($id: ID!) {
    viewer {
      me {
        id
      }
      user(id: $id) {
        name
        coverUrl
        avatarUrl
        bio
        tweets {
          ...TweetList_tweets
        }
      }
    }
  }
`;

const propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired,
    }),
  }).isRequired,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

class UserPage extends React.Component { //eslint-disable-line
  render() {
    const { match, classes } = this.props;
    return (
      <QueryRenderer
        environment={relayEnviroment}
        variables={{
          id: match.params.userId,
        }}
        query={UserPageQuery}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          }
          else if (props) {
            const { user, me } = props.viewer; //eslint-disable-line
            return (
              <Grid container spacing={16}>
                <Grid item xs={12}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.coverImage}
                      image={user.coverUrl}
                      title={user.name}
                    />
                    <CardContent>
                      <Grid align="center" container>
                        <Grid item>
                          <Avatar
                            alt={user.name}
                            src={user.avatarUrl}
                            className={classes.bigAvatar}
                          />
                        </Grid>
                        <Grid item>
                          <Typography type="title">
                            {user.name}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <FollowButton
                            authenticatedUser={me}
                            user={user}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={4}>
                  <Typography align="center" className={classes.title} type="title">Bio</Typography>
                  <Paper className={classes.paper} elevation={5}>
                    <Typography type="body2">{props.viewer.user.bio}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={8}>
                  <Typography align="center" className={classes.title} type="title">Tweets</Typography>
                  <TweetList authenticatedUser={me} tweets={props.viewer.user.tweets} />
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

UserPage.propTypes = propTypes;

export default withStyles(styles)(UserPage);

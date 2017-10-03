import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { graphql, QueryRenderer } from 'react-relay';
import relayEnvironment from '../relayEnvironment';

const HeaderQuery = graphql`
  query HeaderQuery {
    viewer {
      me {
        id
        name
        avatarUrl
      }
    }
  }
`;

const style = () => ({
  flex: {
    flex: 1,
  },
});

const propTypes = {
  history: React.PropTypes.shape({
    replace: React.PropTypes.func.isRequired,
  }).isRequired,
};

class Header extends React.Component { //eslint-disable-line

  handleLogout = () => {
    localStorage.removeItem('twitter.auth'); //eslint-disable-line
    this.props.history.replace('/login');
  }
  render() {
    const { classes } = this.props; // eslint-disable-line

    return (
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit" className={classes.flex}>
            Twitter
          </Typography>
          <QueryRenderer
            environment={relayEnvironment}
            query={HeaderQuery}
            render={({ error, props }) => {
              if (error) {
                return <div>{error.message}</div>;
              }
              else if (props) {
                const { viewer } = props;
                if (viewer.me) {
                  return (
                    <Button onClick={this.handleLogout} color="contrast">
                      <Avatar alt={viewer.me.name} src={viewer.me.avatarUrl} />
                      Logout
                    </Button>
                  );
                }
                return (
                  <Link to="/login">
                    <Button color="contrast">
                      Login
                    </Button>
                  </Link>
                );
              }
              return <div>Loading</div>;
            }}
          />
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = propTypes;

export default withRouter(withStyles(style)(Header));

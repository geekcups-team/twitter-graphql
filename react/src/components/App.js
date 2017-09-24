import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    width: '100%',
    zIndex: 1,
    overflow: 'hidden',
    flexGrow: 1,
    height: 500,
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
  },
});

class App extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography type="title" color="inherit" noWrap>
              Twitter
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <Typography type="body1" noWrap>
            {'You think water moves fast? You should see ice.'}
          </Typography>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(App);

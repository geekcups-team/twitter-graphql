import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Switch, Route } from 'react-router-dom';
import Header from './Header';

import TweetsPage from './tweets/TweetsPage';
import UserPage from './users/UserPage';

const styles = theme => ({
  content: {
    background: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});


const propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

class App extends React.Component { //eslint-disable-line
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header />
        <div className={classes.content}>
          <Switch>
            <Route exact path="/" component={TweetsPage} />
            <Route exact path="/users/:userId" component={UserPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

App.propTypes = propTypes;

export default withStyles(styles)(App);

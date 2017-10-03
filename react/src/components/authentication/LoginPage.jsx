import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import LoginMutation from '../../mutations/authentication/Login';
import relayEnviroment from '../../relayEnvironment';

const styles = theme => ({
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});

const propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  history: React.PropTypes.shape({
    replace: React.PropTypes.func.isRequired,
  }).isRequired,
};

class LoginPage extends React.Component { //eslint-disable-line
  state = {
    username: null,
    password: null,
    loginError: false,
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await LoginMutation.commit(relayEnviroment, {
        username: this.state.username,
        password: this.state.password,
      });
      localStorage.setItem('twitter.auth', data.login.token); //eslint-disable-line
      this.props.history.replace('/');
    }
    catch (error) {
      this.setState({
        loginError: true,
      });
    }
  };

  handleChange = name => event => (
    this.setState({
      ...this.state,
      [name]: event.target.value,
    })
  );

  render() {
    const { classes } = this.props;

    return (
      <Grid className={classes.loginContainer} justify="center" container spacing={24}>
        <Grid item xs={6}>
          <Paper className={classes.paper} elevation={5}>
            <form onSubmit={this.handleSubmit} className={classes.paper}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography type="display3">Login</Typography>
                  <TextField
                    id="username"
                    label="Username"
                    value={this.state.username || ''}
                    onChange={this.handleChange('username')}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    value={this.state.password || ''}
                    onChange={this.handleChange('password')}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button color="primary" type="submit" raised>Login</Button>
                  {
                    (this.state.loginError)
                      ? (<Typography color="accent">Login error</Typography>)
                      : (null)
                  }
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

LoginPage.propTypes = propTypes;

export default withStyles(styles)(LoginPage);

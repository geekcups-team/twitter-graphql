import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

import CreateMutation from '../../mutations/tweets/Create';

const styles = theme => ({
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
});

const propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  relayEnvironment: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

class LoginPage extends React.Component { //eslint-disable-line
  state = {
    text: null,
    tweetError: false,
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await CreateMutation.commit(this.props.relayEnvironment, {
        text: this.state.text,
      });
      this.setState({
        ...this.state,
        text: null,
        tweetError: false,
      });
    }
    catch (error) {
      this.setState({
        tweetError: true,
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
      <Grid justify="center" container spacing={24}>
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={1}>
            <form onSubmit={this.handleSubmit} className={classes.paper}>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    id="text"
                    label="text"
                    value={this.state.text || ''}
                    onChange={this.handleChange('text')}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button color="primary" type="submit" raised>Tweet!</Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.tweetError}
          onRequestClose={() => this.setState({ ...this.state, tweetError: false })}
          autoHideDuration={1500}
          message={<span>Your tweet cannot be sent!</span>}
        />
      </Grid>
    );
  }
}

LoginPage.propTypes = propTypes;

export default withStyles(styles)(LoginPage);

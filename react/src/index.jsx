import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto/index.css';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import App from './components/App';
import LoginPage from './components/authentication/LoginPage';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const theme = createMuiTheme();

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route path="/" component={App} />
      </Switch>
    </BrowserRouter>
  </MuiThemeProvider>,
  document.getElementById('root'));

registerServiceWorker();

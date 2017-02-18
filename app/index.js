import 'normalize.css';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import routes from './routes';
import configureStore from './store/configureStore';

import './app.global.css';
import theme from './customTheme';

injectTapEventPlugin();
export const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

const cTheme = getMuiTheme(theme);
console.log(cTheme)
render(
  <MuiThemeProvider muiTheme={cTheme}>
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  </MuiThemeProvider>, document.getElementById('root'));

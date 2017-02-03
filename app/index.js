import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, hashHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import 'normalize.css'
import './app.global.css';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

render(
  <MuiThemeProvider>
  <Provider store={store}>
    <Router history={history} routes={routes}/>
  </Provider>
</MuiThemeProvider>, document.getElementById('root'));

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import AllScreens from './containers/AllScreens';
import CounterPage from './containers/CounterPage';
import ScreenView from './containers/Screen'
import Settings from './containers/Settings.jsx';

import {store} from './index';

const isScreenSelected = (nextState, replace, callback)=>{
  const {screen:{currentScreen}} = store.getState()
  if(!currentScreen) {
    replace('/')
  }
    callback()
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={AllScreens} />
    <Route path="/screen" component={ScreenView} onEnter={isScreenSelected} />
    <Route path="/settings" component={Settings} />
  </Route>
);

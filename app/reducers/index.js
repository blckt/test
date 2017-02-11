// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import screen from './screen';
import nav from './nav'
const rootReducer = combineReducers({
  screen,
  routing,
  nav
});

export default rootReducer;

// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import screem from '././screen';

const rootReducer = combineReducers({
  counter,
  screen,
  routing
});

export default rootReducer;

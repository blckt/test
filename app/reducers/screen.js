//@flow
import { GET_ALL_SCREENS, GET_CURRENT_SCREEN, GETTINGS_SCREENS, REMOVE_CURRENT_SCREEN } from '../actions/screen'

import type { screen } from '../actions/screen'
import Immutable from 'immutable';

const state = Immutable.Map({
  allScreens: [],
    currentScreen: null,
    isCapturing: false,
    isGettingScreens: false
})

type actionType = {
  type: string
};

export default function counter(state:state = state, action: actionType) {
  switch (action.type) {
    default:
      return state;
  }
}

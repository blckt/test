
import { GET_ALL_SCREENS, SET_CURRENT_SCREEN, GET_CURRENT_SCREEN, GETTINGS_SCREENS, REMOVE_CURRENT_SCREEN, SET_ALL_SCREENS, VIDEO_RECORDER_INSTALLED } from '../actions/screen'


const initialState = {
  allScreens: [],
  currentScreen: null,
  isCapturing: false,
  isGettingScreens: false,
  mediaRecorder: null
}



export default function screens(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_SCREENS: {
      return Object.assign({}, state, { allScreens: action.payload })
    }
    case SET_ALL_SCREENS: {
      return Object.assign({}, state, { allScreens: action.payload.screens })
    }
    case SET_CURRENT_SCREEN: {
      return Object.assign({}, state, { currentScreen: action.payload.scr })
    }
    case VIDEO_RECORDER_INSTALLED: {
      const {payload: {mediaRecorder}} = action;
      return Object.assign({}, state, { mediaRecorder })
    }
    
    default:
      return state;
  }
}

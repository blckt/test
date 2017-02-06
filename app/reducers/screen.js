
import { GET_ALL_SCREENS,SET_CURRENT_SCREEN, GET_CURRENT_SCREEN, GETTINGS_SCREENS, REMOVE_CURRENT_SCREEN,SET_ALL_SCREENS } from '../actions/screen'


const initialState = {
  allScreens: [],
    currentScreen: null,
    isCapturing: false,
    isGettingScreens: false
}



export default function screens(state=initialState, action) {
  switch (action.type) {
    case GET_ALL_SCREENS:{
      return Object.assign({},state,{allScreens:action.payload})
    }
    case SET_ALL_SCREENS:{
            return Object.assign({},state,{allScreens:action.payload.screens})
    }
    case SET_CURRENT_SCREEN:{
      return Object.assign({},state,{currentScreen:action.payload.scr})
    }
    default:
      return state;
  }
}

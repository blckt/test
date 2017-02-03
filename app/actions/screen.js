// @flow
import { desktopCapturer } from 'electron'

/**
* consts
*/
export const GET_ALL_SCREENS = 'GET_ALL_SCREENS'
export const SET_ALL_SCREENS = 'SET_ALL_SCREENS'
export const SET_CURRENT_SCREEN = 'SET_CURRENT_SCREEN'
export const REMOVE_CURRENT_SCREEN = 'REMOVE_CURRENT_SCREEN'
export const START_CAPTURING = 'START_CAPTURING'
export const STOP_CAPTURING = 'STOP_CAPTURING'
export const GETTINGS_SCREENS = 'GETTINGS_SCREENS '
export const GET_CURRENT_SCREEN = 'GET_CURRENT_SCREEN'

export type screen = {
  id: string,
  thumbnail: any,
  name: string
}


export function setCurrentScreen(scr: screen) {
  return ({
    type: SET_CURRENT_SCREEN,
    payload: { scr }
  })
}


export function setAllScreens(screens: Array<screen>) {
  return ({
    type: SET_ALL_SCREENS,
    payload: {
      screens
    }
  })
}


export function removeCurrentScreen() {
  return ({
    type: REMOVE_CURRENT_SCREEN
  })
}


export function geetingScreens(isGetting: boolean) {
  return ({
    type: GETTINGS_SCREENS,
    payload: {
      isGetting
    }
  })
}

export function getAllScreens() {
  return (dispatch: () => void) => {
    desktopCapturer.getSources({ types: ['window', 'screen'] }, (err: Error, sources: Array<screen>) => {
      if (err) {
        dispatch({
          type: 'ERROR',
          payload: { err }
        })
      }
      dispatch(setAllScreens(sources))
    })
  }
}

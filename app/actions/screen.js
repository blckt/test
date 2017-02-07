import { desktopCapturer } from 'electron'

import { push } from 'react-router-redux';

import { startCapturing } from '../utils/capture'
import { store } from '../index';

import { throwError } from './errors'

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
export const ON_VIDEO_DATA = 'ON_VIDEO_DATA'
export const VIDEO_RECORDER_INSTALLED = 'VIDEO_RECORDER_INSTALLED'
export const VIDEO_CAPTURE_STATE_CHANGE = 'VIDEO_CAPTURE_STATE_CHANGE'


export function installVideoRecorder(stream) {
  return dispatch => {
    startCapturing(stream)
      .then(mediaRecorder => dispatch({ type: VIDEO_RECORDER_INSTALLED, payload: { mediaRecorder } }))
      .catch(err => {
        alert(err.message)
        dispatch(throwError(err))
      })
  }
}


export function destroyRecorder() {
  return {
    type: VIDEO_RECORDER_INSTALLED,
    payload: {
      mediaRecorder: null
    }
  }
}

export function startVideoCapture() {
  const {screen: {mediaRecorder}} = store.getState();
  if (mediaRecorder) {
    mediaRecorder.startCapture();
    return {
      type: VIDEO_CAPTURE_STATE_CHANGE,
      payload: {
        isCapturing: true
      }
    }
  } else {
    return throwError('Media Recorder not initialized')
  }
}


export function stopVideoCapturing() {
  const {screen: {mediaRecorder}} = store.getState();
  if (mediaRecorder) {
    mediaRecorder.stopCapture();
    return {
      type: VIDEO_CAPTURE_STATE_CHANGE,
      payload: {
        isCapturing: false
      }
    }
  } else {
    return throwError('Media Recorder not initialized')
  }
}

export function onVideoStreamData(data) {
  return {
    type: ON_VIDEO_DATA,
    payload: {
      data
    }
  }
}

export function setCurrentScreen(scr) {
  return dispatch => {
    dispatch({
      type: SET_CURRENT_SCREEN,
      payload: { scr }
    })
    dispatch(push('/screen'))
  }
}


export function setAllScreens(screens) {
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


export function geetingScreens(isGetting) {
  return ({
    type: GETTINGS_SCREENS,
    payload: {
      isGetting
    }
  })
}

export function getAllScreens() {

  return dispatch => {

    desktopCapturer.getSources({ types: ['window', 'screen'] }, (err, sources) => {
      if (err) {
        dispatch({
          type: 'ERROR',
          payload: { error: err }
        })
      }
      dispatch(setAllScreens(sources))
    })
  }
}


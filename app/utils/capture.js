import * as fs from 'fs';
import { store } from '../index';

import * as actions from '../actions/screen';

import ExtendedMediaRecorder from './MediaRecorder';

export function startCapturing(stream) {

  return new Promise((resolve, reject) => {
    let options = { mimeType: 'video/webm;codecs=vp9' };
    let mediaRecorder;
    let recordedBlobs = [];

    // const readStream = fs.createReadStream()
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      console.log(options.mimeType + ' is not Supported');
      options = { mimeType: 'video/webm;codecs=vp8' };
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.log(options.mimeType + ' is not Supported');
        options = { mimeType: 'video/webm' };
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          console.log(options.mimeType + ' is not Supported');
          options = { mimeType: '' };
        }
      }
    }



    function handleStop(event) {
      alert('Recorder stopped: ', event);
    }
    const handleDataAvailable = (event) => {
      if (event.data && event.data.size > 0) {
      //  recordedBlobs.push(event.data);
      }
    }

    mediaRecorder = new ExtendedMediaRecorder(stream, options, {
      onStop: handleStop,
      onData: handleDataAvailable,
      onStart: () => { console.log('record started') },
      onStop: () => {
        console.log(this);
      },
      onError: reject
    })

    resolve(mediaRecorder)
    // try {
    //   mediaRecorder = new MediaRecorder(this.stream, options);
    //   console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
    //   mediaRecorder.onstop = handleStop;
    //   mediaRecorder.ondataavailable = handleDataAvailable;
    //   mediaRecorder.start(10); // collect 10ms of data
    //   console.log('MediaRecorder started', mediaRecorder);
    //   resolve(mediaRecorder)
    // }
    // catch (e) {
    //   console.error('Exception while creating MediaRecorder: ' + e);
    //   alert('Exception while creating MediaRecorder: '
    //     + e + '. mimeType: ' + options.mimeType);
    //   reject(e);
    //   return;
    // }
  })

}

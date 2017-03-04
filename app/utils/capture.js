// @flow
import * as fs from 'fs';
import { resolve } from 'path';
import * as actions from '../actions/screen';

import ExtendedMediaRecorder from './MediaRecorder';

import { store } from '../index';
import { writeToFile, StreamWriter } from './fileWriter';

import './ffmpegWorker';

const filePath = resolve(__dirname, 'result', 'file');

export function startCapturing(videoStream, audioStream) {
  return new Promise((resolve, reject) => {
    let options = { mimeType: 'video/webm;codecs=vp9' };
    let recorder;
    const recordedBlobs = [];
    const download = () => {
      let blob = new Blob(recordedBlobs, { type: 'video/webm' })
      let url = URL.createObjectURL(blob)
      let a = document.createElement('a')
      document.body.appendChild(a)
      a.style = 'display: none'
      a.href = url
      a.download = 'electron-screen-recorder.webm'
      a.click()
      setTimeout(function () {
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      }, 100)
    }
    const tracks = audioStream.getAudioTracks();
    videoStream.addTrack(tracks[0]);
    const vAudTracks =  videoStream.getAudioTracks();
    const vVidtracks = videoStream.getVideoTracks();
    try {
      recorder = new MediaRecorder(videoStream);
    } catch (error) {
      new Notification('Error', { body: error.message })
    }
    // const blobOptions = { type: 'video/webm' };
    debugger;
    recorder.onstop = function () {
      console.log(recordedBlobs)
      download();
    }
    recorder.ondataavailable = function (blob) {
      console.log(blob);
      recordedBlobs.push(blob.data);
    }
    recorder.start(2000);
    setTimeout(() => {
      recorder.stop()
    }, 10000)

    resolve(recorder);

  });
}


/*
(resolve, reject) => {
    let options = { mimeType: 'video/webm;codecs=vp9' };
    let mediaRecorder;
    const recordedBlobs = [];
    const blobOptions = { type: 'video/webm' };
    const streamWriter = new StreamWriter(filePath);
    // const readStream = fs.createReadStream()
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      console.log(`${options.mimeType} is not Supported`);
      options = { mimeType: 'video/webm;codecs=vp8' };
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.log(`${options.mimeType} is not Supported`);
        options = { mimeType: 'video/webm' };
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          console.log(`${options.mimeType} is not Supported`);
          options = { mimeType: '' };
        }
      }
    }

    let blobToBase64 = function (blob, cb) {
      let reader = new FileReader();
      reader.onload = function () {
        let dataUrl = reader.result;
        let base64 = dataUrl.split(',')[1];
        cb(base64);
      };
      reader.readAsDataURL(blob);
    };

    function handleStop(event) {
      alert('Recorder stopped: ', event);
    }
    const handleDataAvailable = (event) => {
      if (event.data && event.data.size > 0) {
        //  recordedBlobs.push(event.data);
        // chunksToBuffer(event.data, blobOptions)
        //   .then(buffer => streamWriter.writeData(buffer))
        // writeToFile(filePath, buffer)
      }
    };

    // function chunksToBuffer(chunk, options = blobOptions) {
    //   return new Promise((resolve, reject) => {
    //     const blob = new Blob([chunk], options)
    //     blobToBase64(blob, resolve)
    //   })
    // }
    mediaRecorder = new ExtendedMediaRecorder(stream, options, {
      onStop: handleStop,
      onData: handleDataAvailable,
      onStart: () => { console.log('record started'); },
      onStop: () => {
        console.log(this);
      },
      onError: reject
    });

    console.log(mediaRecorder.getReader);

    resolve(null);
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
  }*/

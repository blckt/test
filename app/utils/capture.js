// @flow
import * as fs from 'fs';
import { resolve, join } from 'path';
import * as actions from '../actions/screen';

import ExtendedMediaRecorder from './MediaRecorder';

import { store } from '../index';
import { writeToFile, StreamWriter } from './fileWriter';

import RTC from 'recordrtc'

import './ffmpegWorker';
import ObserverableBuffer from './captureObserver';
const filePath = resolve(__dirname, 'result', 'file');

export function startCapturing(videoStream, audioStream) {
  return new Promise((resolve, reject) => {
    let options = { mimeType: 'video/webm;codecs=vp9' };
    let videoRecorder;
    const recordedBlobs = [];
    const download = () => {
      let blob = new Blob(recordedBlobs, { type: 'video/webm' })
      var fileReader = new FileReader();
      fileReader.onload = function () {
        console.log(join(__dirname, 'test.webm'))
        fs.writeFile(join(__dirname, 'test.webm'), Buffer(new Uint8Array(this.result)), (err) => { console.log('done') });
      };
      fileReader.readAsArrayBuffer(blob);
    }

    const tracks = audioStream.getAudioTracks();
    if (tracks[0]) {
      videoStream.addTrack(tracks[0]);
    }
    const vAudTracks = videoStream.getAudioTracks();
    const vVidtracks = videoStream.getVideoTracks();
    let buffer;
    try {
      videoRecorder = new MediaRecorder(videoStream);
       buffer = new ObserverableBuffer(videoRecorder);

    } catch (error) {
      new Notification('Error', { body: error.message })
    }
   // videoRecorder.onstop = download;
    videoRecorder.onstart = function () {
      console.log("capture started")
       buffer.addVideoObs();
    }
    // videoRecorder.ondataavailable = (blob) => {
    //   if (blob.data.length > 0) {
    //     recordedBlobs.push(blob.data);
    //   }
    // }

    videoRecorder.start(300);
    setTimeout(() => { videoRecorder.stop() }, 3000)
    resolve(videoRecorder);

  });
}

/*
(resolve, reject) => {
    let options = { mimeType: 'video/webm;codecs=vp9' };
    let mediavideoRecorder;
    const recordedBlobs = [];
    const blobOptions = { type: 'video/webm' };
    const streamWriter = new StreamWriter(filePath);
    // const readStream = fs.createReadStream()
    if (!MediavideoRecorder.isTypeSupported(options.mimeType)) {
      console.log(`${options.mimeType} is not Supported`);
      options = { mimeType: 'video/webm;codecs=vp8' };
      if (!MediavideoRecorder.isTypeSupported(options.mimeType)) {
        console.log(`${options.mimeType} is not Supported`);
        options = { mimeType: 'video/webm' };
        if (!MediavideoRecorder.isTypeSupported(options.mimeType)) {
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
      alert('videoRecorder stopped: ', event);
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
    mediavideoRecorder = new ExtendedMediavideoRecorder(stream, options, {
      onStop: handleStop,
      onData: handleDataAvailable,
      onStart: () => { console.log('record started'); },
      onStop: () => {
        console.log(this);
      },
      onError: reject
    });

    console.log(mediavideoRecorder.getReader);

    resolve(null);
  return new Promise((resolve, reject) => {



    var options = {
      mimeType: 'video/mp4', // or video/mp4 or audio/ogg
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 128000,
      bitsPerSecond: 128000 // if this line is provided, skip above two
    };


    let recordRTC = RTC(stream, options);
    console.log(recordRTC)
    resolve(recordRTC)

    // let options = { mimeType: 'video/webm;codecs=vp9' };
    // let mediavideoRecorder;
    // let recordedBlobs = [];
    // let blobOptions = { type: 'video/webm' };
    // let streamWriter = new StreamWriter(filePath);
    // // const readStream = fs.createReadStream()
    // if (!MediavideoRecorder.isTypeSupported(options.mimeType)) {
    //   console.log(options.mimeType + ' is not Supported');
    //   options = { mimeType: 'video/webm;codecs=vp8' };
    //   if (!MediavideoRecorder.isTypeSupported(options.mimeType)) {
    //     console.log(options.mimeType + ' is not Supported');
    //     options = { mimeType: 'video/webm' };
    //     if (!MediavideoRecorder.isTypeSupported(options.mimeType)) {
    //       console.log(options.mimeType + ' is not Supported');
    //       options = { mimeType: '' };
    //     }
    //   }
    // }

    // var blobToBase64 = function (blob, cb) {
    //   var reader = new FileReader();
    //   reader.onload = function () {
    //     var dataUrl = reader.result;
    //     var base64 = dataUrl.split(',')[1];
    //     cb(base64);
    //   };
    //   reader.readAsDataURL(blob);
    // };

    // function handleStop(event) {
    //   alert('videoRecorder stopped: ', event);
    // }
    // const handleDataAvailable = (event) => {
    //   if (event.data && event.data.size > 0) {
    //     //  recordedBlobs.push(event.data);
    //     // chunksToBuffer(event.data, blobOptions)
    //     //   .then(buffer => streamWriter.writeData(buffer))
    //     //writeToFile(filePath, buffer)
    //   }
    // }

    // // function chunksToBuffer(chunk, options = blobOptions) {
    // //   return new Promise((resolve, reject) => {
    // //     const blob = new Blob([chunk], options)
    // //     blobToBase64(blob, resolve)
    // //   })
    // // }


    // debugger;
    // mediavideoRecorder = new ExtendedMediavideoRecorder(stream, options, {
    //   onStop: handleStop,
    //   onData: handleDataAvailable,
    //   onStart: () => { console.log('record started') },
    //   onStop: () => {
    //     console.log(this);
    //   },
    //   onError: reject
    // })

    // console.log(mediavideoRecorder.getReader)

    // try {
    //   mediavideoRecorder = new MediavideoRecorder(this.stream, options);
    //   console.log('Created MediavideoRecorder', mediavideoRecorder, 'with options', options);
    //   mediavideoRecorder.onstop = handleStop;
    //   mediavideoRecorder.ondataavailable = handleDataAvailable;
    //   mediavideoRecorder.start(10); // collect 10ms of data
    //   console.log('MediavideoRecorder started', mediavideoRecorder);
    //   resolve(mediavideoRecorder)
    // }
    // catch (e) {
    //   console.error('Exception while creating MediavideoRecorder: ' + e);
    //   alert('Exception while creating MediavideoRecorder: '
    //     + e + '. mimeType: ' + options.mimeType);
    //   reject(e);
    //   return;
    // }
  }*/

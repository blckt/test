
export function startCapturing(stream) {

  return new Promise((resolve, reject) => {
    let options = { mimeType: 'video/webm;codecs=vp9' };
    let mediaRecorder = this.mediaRecorder;
    let recordedBlobs = [];
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
        recordedBlobs.push(event.data);
      }
    }
    try {
      mediaRecorder = new MediaRecorder(this.stream, options);
      console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
      mediaRecorder.onstop = handleStop;
      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorder.start(10); // collect 10ms of data
      console.log('MediaRecorder started', mediaRecorder);
      resolve(mediaRecorder)
    }
    catch (e) {
      console.error('Exception while creating MediaRecorder: ' + e);
      alert('Exception while creating MediaRecorder: '
        + e + '. mimeType: ' + options.mimeType);
        reject(e);
      return;
    }
  })

}

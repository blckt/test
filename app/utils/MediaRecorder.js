
const mediaRecorder = Symbol();


export default class {
  constructor(stream, recorderOptions, events) {
    this.stream = stream;
    this.chunks = [];
    this.defaultOptions = {
      onData: () => { },
      onStart: () => { },
      onError: () => { },
      onStop: () => { },
      onPause: () => { },
      onResume: () => { },
    }

    for (let key in events) {
      if (key in this.defaultOptions) {
        this.defaultOptions[key] = events[key];
      }
    }

    try {
      this[mediaRecorder] = new MediaRecorder(this.stream, recorderOptions);
      this[mediaRecorder].ondataavailable  = this.onData;
      this[mediaRecorder].onstop = this.onStop;
      this[mediaRecorder].onerror = this.onError;
    }
    catch (e) {
      alert(e.message);
    }
  }

  startCapture = () => {
    this[mediaRecorder].start(1000);
    this.onStart(true);
  }

  stopCapture = () => {
    this[mediaRecorder].stop();
  }

  pauseCapture = () => {
    this[mediaRecorder].pause();
  }

  resumeCapture = () => {
    this[mediaRecorder].resume()
  }
  get mediaRecorder() {
    return this[mediaRecorder];
  }
  saveToFile(filePath = "temp") {

  }
  onData = (e) => {
    if (e.data && e.data.size > 0) {
      this.chunks.push(e.data);
    }
    console.log(e.data);
    this.defaultOptions.onData(e);
  }

  onStart = (e) => {
    this.defaultOptions.onStart(true)
  }

  onError = (e) => {
    this.defaultOptions.onError(e);
  }
  onStop = (e) => {
    this.defaultOptions.onStop(e);
  }

}

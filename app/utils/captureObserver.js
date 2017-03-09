// @flow
import { Observable, Subject, Observer } from 'rx';
import { join } from 'path';
import { createWriteStream } from 'fs';
import { ReadStream } from './ffmpegWorker'



export default class {
  constructor(videoRecorder) {
    this.index = 0;
    this.bufferData = [];
    this.audioObs = Observable.from(this.bufferData);
    this.videoRecorder = videoRecorder;
    this.readStream = new ReadStream();
    console.log(__dirname + '/temp.data');
    this.writeStream = createWriteStream(__dirname + '/temp.data');
    this.readStream.pipe(this.writeStream);

    this.readStream.on('data', (data) => console.log(data))
  }

  addVideoObs = () => {
    this.videoObs = Observer.create((data) => {
      this.bufferData.push({ video: data })
    })
    this.videoObservable = Observable.create((obs) => {
      this.videoRecorder.ondataavailable = (blob) => {
        if (blob.data.size > 0) {
          obs.onNext(blob.data);
        }
        console.log(blob)
      }
      this.videoRecorder.onstop = () => {
        obs.onCompleted();
        console.log(this.bufferData);
      }
    });
    this.videoSubject = Subject.create(this.videoObs, this.videoObservable)
      .map(data => (val) => ({ index: this.index, video: data }))
      .scan((val, changeFn) => (++this.index, changeFn(val)), {})
      .filter(val => val);

    const sub = this.videoSubject.subscribe(({ video }) => {
      if (video) {
        this.asBuffer(video).then(data => {
          let blob = new Buffer(new Uint8Array(data));
          this.readStream.push(blob);
        });
      }
    }, (err) => {
      console.log('Error: ' + err);
    }, () => {
      console.log('Completed');
    });
  }

  asBuffer = (blob) => {
    return new Promise((resolve, reject) => {
      let buffer;
      const fr = new FileReader();
      fr.onload = function () {
        buffer = this.result;
        resolve(buffer);
      }
      fr.readAsArrayBuffer(blob)
    })
  }
}

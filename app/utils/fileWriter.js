const fs = require('fs');
const { app } = require('electron').remote;

console.log(app.getAppPath())
export function writeToFile(path, buff) {
  const buf = new Buffer(buff, 'base64')
  const wstream = fs.createWriteStream(path, {
    flags: 'r+',
    defaultEncoding: 'utf8',
    fd: null,
    mode: 0o666,
    autoClose: true
  });
  wstream.write(buf);
  wstream.end();

  // fs.writeFile(path + Date.now(), buf, {}, (err, res) => {
  //   if (err) {
  //     alert(err.message)
  //   }
  //   console.log(res);
  // })
}

export function writeToStream(buff) {
  return fs.createReadStream(buff);
}


export class StreamWriter {
  constructor(path) {
    this.buffer = new Buffer([])
    this.writeStream = fs.createWriteStream(path, {

    });
    this.readStream = fs.createReadStream(this.buffer);

    this.readStream.on('data', chunk => {
      console.log('new chunk');
      console.log(data);
    })
  }

  writeData = (chunk) => {
    this.writeStream.write(chunk);
  }

}

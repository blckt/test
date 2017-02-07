export default function (app) {
  const ffbinaries = require('ffbinaries');
  const path = require('path');
  const fs = require('fs');
  const platform = ffbinaries.detectPlatform();
  const dest = path.resolve(__dirname, 'binaries');
  import os from 'os';


  fs.readdir(dest, (err, files) => {
    if (!files || (files && files.length === 0)) {
      ffbinaries.downloadFiles(platform, { destination: dest }, function () {
        console.log('Downloaded binaries for ' + platform + '.');
        resolvePath(dest);
      })
    } else {
      console.log('binaries already exists')
      resolvePath(dest);
    }

  });


  function resolvePath(dest) {
    let ffmpegPath;
    if (os.platform() === 'win32') {
      ffmpegPath = path.resolve(dest, 'ffmpeg.exe')
    } else {
      ffmpegPath = path.resolve(dest, 'ffmpeg')
    }
    app.setPath("ffmpeg", ffmpegPath)
  }

}

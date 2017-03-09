const fs = require('fs');
const { Readable } = require('stream');

export  class ReadStream extends Readable {
  constructor(...args) {
    super(...args)
  }

  _read() {

  }
}

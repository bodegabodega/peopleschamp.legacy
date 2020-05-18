const debug = require('debug')('template-plugin');

module.exports = options => {
  const defaults = {
    sensible: 'default'
  }
  const settings = Object.assign({}, defaults, options);
  return (files, metalsmith, done) => {
    Object.keys(files).forEach(path => {
      var file = files[path];
      const contents = file.contents.toString();
      // do it bro
      file.contents = Buffer.from(rendered);
    })
    setImmediate(done);
  }
}
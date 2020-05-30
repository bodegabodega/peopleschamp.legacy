const debug = require('debug')('template-plugin');

module.exports = options => {
  const defaults = {
    sensible: 'default'
  }
  const settings = Object.assign({}, defaults, options);
  return (files, metalsmith, done) => {
    Object.keys(files).forEach(path => {
      var file = files[path];
      file.innerContent = file.contents.toString();
    })
    setImmediate(done);
  }
}
const debug = require('metalsmith-debug'),
      build = require('./build');

build
  .use(debug())
  .build(function(err, files) {
    if (err) { throw err; }
  });
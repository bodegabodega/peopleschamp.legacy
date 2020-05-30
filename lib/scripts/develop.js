const debug = require('metalsmith-debug'),
      build = require('./build');

build('development')
  .use(debug())
  .build(function(err, files) {
    if (err) { throw err; }
  });
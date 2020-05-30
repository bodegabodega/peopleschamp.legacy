const s3 = require('metalsmith-s3'),
      build = require('./build'),
      bucket = 'peopleschamp.io';

build('production')
  .use(s3({
    bucket,
    action: 'write'
  }))
  .build(function(err, files) {
    if (err) { throw err; }
  });

  console.log(`http://${bucket}.s3-website-us-east-1.amazonaws.com`)
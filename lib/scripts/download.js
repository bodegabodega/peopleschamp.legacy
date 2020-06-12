const path = require('path'),
  fs = require('fs'),
  aws = require('aws-sdk'),
  s3 = new aws.S3();

const downloadFile = async (filePath, Bucket, Key) => {
  return new Promise(( resolve, reject ) => {
    console.log(`Downloading ${Bucket}/${Key}`);
    const params = { Bucket, Key };
    var fileStream = fs.createWriteStream(filePath);
    var s3Stream = s3.getObject(params).createReadStream();

    s3Stream.on('error', error => {
        console.error(error);
        reject(err)
    });

    s3Stream.pipe(fileStream).on('error', error => {
        console.error('File Stream:', error);
        reject(error)
    }).on('close', () => {
        console.log(`${filePath} downloaded`);
        resolve()
    });

  })
};
const downloadFilesInBucket = async (Bucket, Prefix, to) => {
  var params = { Bucket, Prefix };
  s3.listObjectsV2(params, (error, data) => {
    if (error) {
      console.log(error, error.stack);
    } else {
      data.Contents.forEach(async file => {
        if (file.Size > 0) {
          await downloadFile(`${to}/${file.Key}`, bucket, file.Key)
        }
      })
    }
  });
}

const bucket = "peopleschamp.io";
const destination = path.join(__dirname, '../../content/static');
(async () => {
  ["audio", "images"].forEach(async key => {
    await downloadFilesInBucket(bucket, key, destination);
  })
})()
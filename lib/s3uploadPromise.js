'use strict'

const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const fs = require('fs')
const mime = require('mime-types')

require('dotenv').config()

const promiseUpload = (req) => {
  return new Promise((resolve, reject) => {
    const filePath = req.file.path
    // const filePathArray = filePath.split('/')
    // const fileName = filePathArray[filePathArray.length - 1]

    // const keyName = req.file.originalname.split('.')[0]
    // const fileType = mime.lookup(filePath)
    const extension = mime.extension(req.file.mimetype)

    const fileStream = fs.createReadStream(filePath)
    console.log('BUCKET NAME IS', process.env.AWS_BUCKET_NAME)

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.file.filename + '.' + extension,
      Body: fileStream,
      ContentType: req.file.mimetype,
      ACL: 'public-read'
    }

    s3.upload(params, function (err, data) {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

module.exports = promiseUpload

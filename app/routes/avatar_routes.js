const express = require('express')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const User = require('../../models/user')
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const promiseUpload = require('../../lib/s3uploadPromise.js')
const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })

// INDEX ALL
// GET /uploads
router.get('/uploads', requireToken, (req, res, next) => {
  User.find()
    .then(uploads => {
      return uploads.map(upload => upload.toObject())
    })
    .then(uploads => res.status(200).json({ uploads: uploads }))
    .catch(next)
})

// INDEX ALL USER OWNED
router.get('/uploads/all', requireToken, (req, res, next) => {
  User.find({'owner': req.user.id})
    .then(uploads => {
      return uploads.map(upload => upload.toObject())
    })
    .then(uploads => res.status(200).json({ uploads: uploads }))
    .catch(next)
})

// SHOW
// GET /uploads/5a7db6c74d55bc51bdf39793
router.get('/uploads/:id', requireToken, (req, res, next) => {
  User.findById(req.params.id)
    .then(handle404)
    .then(upload => res.status(200).json({ upload: upload.toObject() }))
    .catch(next)
})

// CREATE
// POST /uploads
router.post('/uploads', requireToken, removeBlanks, upload.single('image'), (req, res, next) => {
  // const owner = req.user.id
  // const metaTitle = req.body.title
  // const tag = req.body.tag
  promiseUpload(req)
    .then(response => {
      User.findById(req.params.id)
        .then(handle404)
        .then(upload => {
          requireOwnership(req, upload)
          return User.update({avatarImgUrl: response.location})
        })
    })
    .then(newAvatar => {
      res.status(201).json({ upload: newAvatar.toObject() })
    })
    .catch(next)
})

// UPDATE
// PATCH /uploads/5a7db6c74d55bc51bdf39793
router.patch('/uploads/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.upload.owner

  User.findById(req.params.id)
    .then(handle404)
    .then(upload => {
      requireOwnership(req, upload)
      return upload.update(req.body.upload)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY
// DELETE /uploads/5a7db6c74d55bc51bdf39793
router.delete('/uploads/:id', requireToken, (req, res, next) => {
  User.findById(req.params.id)
    .then(handle404)
    .then(upload => {
      requireOwnership(req, upload)
      upload.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router

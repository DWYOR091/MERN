const express = require('express')
const router = express.Router()
const { index, create, find, update, destroy } = require('./controller')

router.route('/events')
    .get(index)
    .post(create)

router.route('/events/:id')
    .get(find)
    .put(update)
    .delete(destroy)

module.exports = router
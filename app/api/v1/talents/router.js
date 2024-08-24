const express = require('express')
const router = express.Router()
const { create, index, find, update, destroy } = require('./controller')

router.route('/talents')
    .post(create)
    .get(index)
router.route('/talents/:id')
    .get(find)
    .put(update)
    .delete(destroy)

module.exports = router
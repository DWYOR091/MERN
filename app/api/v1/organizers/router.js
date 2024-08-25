const express = require('express')
const { create } = require('./controller')
const router = express.Router()

router.route('/organizers')
    .post(create)

module.exports = router
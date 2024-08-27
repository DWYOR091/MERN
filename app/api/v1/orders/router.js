const express = require('express')
const router = express.Router()
const { index } = require('./controller')
const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth')
router.route('/orders').get(authenticateUser, authorizeRoles('organizer'), index)

module.exports = router
const express = require('express')
const router = express.Router()
const { index, create, update, destroy, find } = require('./controller')
const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth')

router.route('/payments')
    .get(authenticateUser, authorizeRoles('organizer'), index)
    .post(authenticateUser, authorizeRoles('organizer'), create)

router.route('/payments/:id')
    .get(authenticateUser, authorizeRoles('organizer'), find)
    .put(authenticateUser, authorizeRoles('organizer'), update)
    .delete(authenticateUser, authorizeRoles('organizer'), destroy)

module.exports = router
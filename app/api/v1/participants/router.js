const express = require('express')
const router = express.Router()
const { signup, signin, activeParticipant } = require('./controller')

router.post('/signup', signup)

module.exports = router
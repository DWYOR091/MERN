const express = require('express')
const { create, index, find, update, destroy } = require('./controller')
const router = express.Router()

router.get('/tes', (req, res) => {
    res.send('tester')
})
router.route('/categories')
    .get(index)
    .post(create)

router.route('/categories/:id')
    .get(find)
    .put(update)
    .delete(destroy)

module.exports = router
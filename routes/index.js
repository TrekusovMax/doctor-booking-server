const express = require('express')
const router = express.Router({ mergeParams: true })

router.use('/auth', require('./auth.routes'))
router.use('/user', require('./user.routes'))
router.use('/shedule', require('./shedule.routes'))
router.use('/order', require('./order.routes'))

module.exports = router

const express = require('express')
const router = express.Router()
const tvSeriesRoute = require('./tvSeriesRoute')

router.use('/tv-series', tvSeriesRoute)

module.exports = router
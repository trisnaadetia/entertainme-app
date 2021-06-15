const express = require('express')
const router = express.Router()
const moviesRoute = require('./moviesRoute')
const tvSeriesRoute = require('./tvSeriesRoute')

router.use('/movies', moviesRoute)
router.use('/tv-series', tvSeriesRoute)

module.exports = router
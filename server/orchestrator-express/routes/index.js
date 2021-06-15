const express = require('express')
const router = express.Router()
const moviesRoute = require('./moviesRoute')
const tvSeriesRoute = require('./tvSeriesRoute')
const EntertainmeController = require('../controllers/entertainmeController')

router.use('/movies', moviesRoute)
router.use('/tv-series', tvSeriesRoute)
router.get('/entertainme', EntertainmeController.findAll)

module.exports = router
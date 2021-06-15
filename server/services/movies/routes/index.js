const express = require('express')
const router = express.Router()
const moviesRoute = require('./moviesRoute')

router.use('/movies', moviesRoute)

module.exports = router
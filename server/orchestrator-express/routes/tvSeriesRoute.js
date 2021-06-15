const express = require('express')
const router = express.Router()
const TvSeriesController = require('../controllers/tvSeriesController')

router.get('/', TvSeriesController.findAll)
router.post('/', TvSeriesController.postTvSeries)
router.get('/:id', TvSeriesController.findById)
router.delete('/:id', TvSeriesController.deleteTvSeries)
router.put('/:id', TvSeriesController.updateTvSeries)

module.exports = router
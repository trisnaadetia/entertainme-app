const express = require('express')
const router = express.Router()
const MoviesController = require('../controllers/moviesController')

router.get('/', MoviesController.findAll)
router.post('/', MoviesController.postMovie)
router.get('/:id', MoviesController.findById)
router.delete('/:id', MoviesController.deleteMovie)
router.put('/:id', MoviesController.updateMovie)

module.exports = router
const Movies = require('../models/movies')

class MoviesController {
  static async findAll(req, res, next) {
    try {
      const movies = await Movies.find()
      res.status(200).json(movies)
      
    } catch (error) {
      next(error)
    }
  }

  static async findById(req, res, next) {
    try {
      const { id } = req.params
      const movies = await Movies.findById(id)
      res.status(200).json(movies)

    } catch (error) {
      next(error)
    }
  }

  static async postMovie(req, res, next) {
    try {
      const newMovie = req.body
      const movies = await Movies.postMovie(newMovie)

      if(movies.insertedCount === 1) {
        res.status(201).json(movies)

      } else {
        next({ name: 'errorPost' })
      }
      
    } catch (error) {
      next(error)
    }
  }

  static async deleteMovie(req, res, next) {
    try {
      const { id } = req.params
      const movies = await Movies.deleteMovie(id)

      if (movies.deletedCount === 1) {
        res.status(200).json({ message: "Successfully deleted one document" })
        
      } else {
        next({ name: 'errorDeleted' })
      }
      
    } catch (error) {
      next(error)
    }
  }

  static async updateMovie(req, res, next) {
    try {
      const { id } = req.params
      const newUpdate = req.body
      const movies = await Movies.updateMovie(id, newUpdate)
      
      if (movies.modifiedCount === 1) {
        res.status(200).json({ message: "Successfully updated one document" })
      } else {
        next({ name: 'errorUpdated' })
      }

    } catch (error) {
      next(error)
    }
  }

}

module.exports = MoviesController
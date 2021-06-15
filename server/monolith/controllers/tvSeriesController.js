const TvSeries = require('../models/tvSeries')

class TvSeriesController {
  static async findAll(req, res, next) {
    try {
      const tvSeries = await TvSeries.find()
      res.status(200).json(tvSeries)
    } catch (error) {
      next(error)
    }
  }

  static async findById(req, res, next) {
    try {
      const { id } = req.params
      const tvSeries = await TvSeries.findById(id)
      res.status(200).json(tvSeries)
    } catch (error) {
      next(error)
    }
  }

  static async postTvSeries(req, res, next) {
    try {
      const newTvSeries = req.body
      const tvSeries = await TvSeries.postTvSeries(newTvSeries)
      res.status(201).json(tvSeries)
    } catch (error) {
      next(error)
    }
  }

  static async deleteTvSeries(req, res, next) {
    try {
      const { id } = req.params
      const tvSeries = await TvSeries.deleteTvSeries(id)
      if (tvSeries.deletedCount === 1) {
        res.status(200).json({ message: "Successfully deleted one document." })
      } else {
        next({ name: 'errorDeleted' })
      }
      
    } catch (error) {
      next(error)
    }
  }

  static async updateTvSeries(req, res, next) {
    try {
      const { id } = req.params
      const newUpdate = req.body
      const tvSeries = await TvSeries.updateTvSeries(id, newUpdate)
      if (tvSeries.modifiedCount === 1) {
        res.status(200).json(tvSeries)       
      } else {
        next({ name: 'errorUpdated' })
      }

    } catch (error) {
      next(error)
    }
  }

}

module.exports = TvSeriesController
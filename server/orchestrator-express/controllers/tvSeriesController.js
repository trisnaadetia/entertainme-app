const axios = require('axios')
const Redis = require("ioredis")
const baseUrl = 'http://localhost:4002'
const redis = new Redis()
class TvSeriesController {
  static async findAll(req, res, next) {
    try {
      const result = await redis.get('tv-series')
      if(!result) {
        const { data } = await axios({
          method: 'GET',
          url: baseUrl + `/tv-series`
        })
        await redis.set('tv-series', JSON.stringify(data))
        res.status(200).json(data)

      } else {
        const data = JSON.parse(result)
        res.status(200).json(data)
      }
    } catch (error) {
      next(error)
    }
  }

  static async findById(req, res, next) {
    try {
      const { id } = req.params
      const { data } = await axios({
        method: 'GET',
        url: baseUrl + `/tv-series/${id}`
      })
      res.status(200).json(data)

    } catch (error) {
      next(error)
    }
  }

  static async postTvSeries(req, res, next) {
    try {
      const { 
        title, overview, 
        poster_path, 
        popularity, tag 
      } = req.body

      const { data } = await axios({
        method: 'POST',
        url: baseUrl + `/tv-series`,
        data: {
          title, overview, 
          poster_path, 
          popularity, tag 
        }
      })
      
      await redis.del('tv-series')
      await redis.del('entertainme')
      res.status(201).json(data)

    } catch (error) {
      next(error)
    }
  }

  static async deleteTvSeries(req, res, next) {
    try {
      const { id } = req.params
      const { data } = await axios({
        method: 'DELETE',
        url: baseUrl + `/tv-series/${id}`
      })

      await redis.del('tv-series')
      await redis.del('entertainme')
      res.status(200).json(data)
        
    } catch (error) {
      next(error)
    }
  }

  static async updateTvSeries(req, res, next) {
    try {
      const { 
        title, overview, 
        poster_path, 
        popularity, tag 
      } = req.body
      const { id } = req.params

      const { data } = await axios({
        method: 'PUT',
        url: baseUrl + `/tv-series/${id}`,
        data: {
          title, overview, 
          poster_path, 
          popularity, tag 
        }
      })

      await redis.del('tv-series')
      await redis.del('entertainme')
      res.status(200).json(data)
      
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TvSeriesController
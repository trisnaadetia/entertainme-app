const axios = require('axios')
const Redis = require("ioredis")
const baseUrl = 'http://localhost:4001'
const redis = new Redis()

class MoviesController {
  static async findAll(req, res, next) {
    try {
      const result = await redis.get('movies')
      if(!result) {
        const { data } = await axios({
          method: 'GET',
          url: baseUrl + `/movies`
        })
        await redis.set('movies', JSON.stringify(data))
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
        url: baseUrl + `/movies/${id}`
      })
      res.status(200).json(data)

    } catch (error) {
      next(error)
    }
  }

  static async postMovie(req, res, next) {
    try {
      const { 
        title, overview, 
        poster_path, 
        popularity, tag 
      } = req.body

      const { data } = await axios({
        method: 'POST',
        url: baseUrl + `/movies`,
        data: {
          title, overview, 
          poster_path, 
          popularity, tag 
        }
      })
      
      await redis.del('movies')
      await redis.del('entertainme')
      res.status(201).json(data)
      
    } catch (error) {
      next(error)
    }
  }

  static async deleteMovie(req, res, next) {
    try {
      const { id } = req.params
      const { data } = await axios({
        method: 'DELETE',
        url: baseUrl + `/movies/${id}`
      })
      
      await redis.del('movies')
      await redis.del('entertainme')
      res.status(200).json(data)

    } catch (error) {
      next(error)
    }
  }

  static async updateMovie(req, res, next) {
    try {
      const { 
        title, overview, 
        poster_path, 
        popularity, tag 
      } = req.body
      const { id } = req.params

      const { data } = await axios({
        method: 'PUT',
        url: baseUrl + `/movies/${id}`,
        data: {
          title, overview, 
          poster_path, 
          popularity, tag 
        }
      })

      await redis.del('movies')
      await redis.del('entertainme')
      res.status(200).json(data)
      
    } catch (error) {
      next(error)
    }
  }

}

module.exports = MoviesController
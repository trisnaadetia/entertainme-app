const axios = require('axios')
const Redis = require("ioredis")
const redis = new Redis()
class EntertainmeController {
  static async findAll(req, res, next) {
    try {
      const enpoints = [
        'http://localhost:4001/movies',
        'http://localhost:4002/tv-series'
      ]
      const entertainme = await redis.get('entertainme')

      if(!entertainme) {
        const allData = await Promise.all(enpoints.map(enpoint => {
          return axios.get(enpoint)
        }))

        const result = allData.map(data => data.data)
        await redis.set('entertainme', JSON.stringify(result))
        res.status(200).json(result)
        
      } else {
        const result = JSON.parse(entertainme)
        res.status(200).json(result)
      }
      
    } catch (error) {
      next(error)
    }
  }
}

module.exports = EntertainmeController
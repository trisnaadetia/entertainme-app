const { gql } = require('apollo-server')
const axios = require('axios')
const Redis = require("ioredis")
const redis = new Redis()
const baseUrlTvSeries = 'http://localhost:4002/tv-series'

module.exports = {
  typeDefs: gql`
    type TvSeries {
      _id: ID,
      title: String,
      overview: String,
      poster_path: String,
      popularity: Float,
      tag: [String],
      message: String
    }

    input InputTvSerie {
      _id: ID,
      title: String,
      overview: String,
      poster_path: String,
      popularity: Float,
      tag: [String]
    }

    extend type Query {
      tvSeries: [TvSeries],
      tvSerie(_id: ID): TvSeries
    }

    extend type Mutation {
      addTvSerie(newTvSerie: InputTvSerie): TvSeries,
      deleteTvSerie(_id: ID): TvSeries,
      updateTvSeries(_id: ID, updateTvSeries: InputTvSerie): TvSeries
    }
  `,
  resolvers: {
    Query: {
      tvSeries: async() => {
        try {
          const caching = await redis.get('tv-series')
          if(!caching) {
            const { data } = await axios({
              method: 'GET',
              url: baseUrlTvSeries
            })
            return data
          } else {
            const data = JSON.parse(caching)
            return data
          }
  
        } catch (error) {
          throw error
        }
      },
      tvSerie: async(_, args) => {
        try {
          const { _id } = args
          const { data } = await axios({
            method: 'GET',
            url: baseUrlTvSeries + `/${_id}`
          })
          return data
          
        } catch (error) {
          throw error
        }
      }
    },
    Mutation: {
      addTvSerie: async(_, args) => {
        try {
          const newTvSerie = {
            title: args.newTvSerie.title,
            overview: args.newTvSerie.overview,
            poster_path: args.newTvSerie.poster_path,
            popularity: args.newTvSerie.popularity,
            tag: args.newTvSerie.tag
          }
    
          const { data } = await axios({
            method: 'POST',
            url: baseUrlTvSeries,
            data: newTvSerie
          })
  
          await redis.del('tv-series')
          return data.ops[0]
          
        } catch (error) {
          throw error
        }
      },
      deleteTvSerie: async(_, args) => {
        try {
          const { _id } = args
          const { data } = await axios({
            method: 'DELETE',
            url: baseUrlTvSeries + `/${_id}`
          })
  
          await redis.del('tv-series')
          return data
  
        } catch (error) {
          throw error
        }
      },
      updateTvSeries: async(_, args) => {
        try {
          const { _id } = args
          const updateTvSeries = {
            title: args.updateTvSeries.title,
            overview: args.updateTvSeries.overview,
            poster_path: args.updateTvSeries.poster_path,
            popularity: args.updateTvSeries.popularity,
            tag: args.updateTvSeries.tag
          }
  
          const { data } = await axios({
            method: 'PUT',
            url: baseUrlTvSeries + `/${_id}`,
            data: updateTvSeries
          })
          
          await redis.del('tv-series')
          return data
          
        } catch (error) {
          throw error
        }
      }
    }
  }
}
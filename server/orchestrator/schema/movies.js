const { gql } = require('apollo-server')
const axios = require('axios')
const Redis = require("ioredis")
const redis = new Redis()
const baseUrlMovies = 'http://localhost:4001/movies'

module.exports = {
  typeDefs: gql`
    type Movies {
      _id: ID,
      title: String,
      overview: String,
      poster_path: String,
      popularity: Float,
      tag: [String],
      message: String
    }

    input InputMovie {
      _id: ID,
      title: String,
      overview: String,
      poster_path: String,
      popularity: Float,
      tag: [String]
    }

    extend type Query {
      movies: [Movies],
      movie(_id: ID): Movies,
    }

    extend type Mutation {
      addMovie(newMovie: InputMovie): Movies,
      deleteMovie(_id: ID): Movies,
      updateMovie(_id: ID, updateMovie: InputMovie): Movies,
    }
  `,
  resolvers: {
    Query: {
      movies: async() => {
        try {
          const caching = await redis.get('movies')
          if(!caching) {
            const { data } = await axios({
              method: 'GET',
              url: baseUrlMovies
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
      movie: async(_, args) => {
        try {
          const { _id } = args
          const { data } = await axios({
            method: 'GET',
            url: baseUrlMovies + `/${_id}`
          })
          return data
        } catch (error) {
          throw error
        }
      }
    },
    Mutation: {
      addMovie: async(_, args) => {
        try {
          const newMovie = {
            title: args.newMovie.title,
            overview: args.newMovie.overview,
            poster_path: args.newMovie.poster_path,
            popularity: args.newMovie.popularity,
            tag: args.newMovie.tag
          }
    
          const { data } = await axios({
            method: 'POST',
            url: baseUrlMovies,
            data: newMovie
          })
  
          await redis.del('movies')
          return data.ops[0]
          
        } catch (error) {
          throw error
        }
      },
      deleteMovie: async(_, args) => {
        try {
          const { _id } = args
          const { data } = await axios({
            method: 'DELETE',
            url: baseUrlMovies + `/${_id}`
          })
  
          await redis.del('movies')
          return data
  
        } catch (error) {
          throw error
        }
      },
      updateMovie: async(_, args) => {
        try {
          const { _id } = args
          const updateMovie = {
            title: args.updateMovie.title,
            overview: args.updateMovie.overview,
            poster_path: args.updateMovie.poster_path,
            popularity: args.updateMovie.popularity,
            tag: args.updateMovie.tag
          }
  
          const { data } = await axios({
            method: 'PUT',
            url: baseUrlMovies + `/${_id}`,
            data: updateMovie
          })
          
          await redis.del('movies')
          return data
  
        } catch (error) {
          throw error
        }
      }
    }
  }
}
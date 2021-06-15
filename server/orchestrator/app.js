const { ApolloServer, gql } = require('apollo-server')
const MovieSchema = require('./schema/movies')
const TvSeriesSchema = require('./schema/tvSeries')

const typeDefs = gql`
  type Query
  type Mutation
`

const server = new ApolloServer({ 
  typeDefs: [ MovieSchema.typeDefs, TvSeriesSchema.typeDefs, typeDefs ], 
  resolvers: [ MovieSchema.resolvers, TvSeriesSchema.resolvers ] 
})

server.listen().then(({ url }) => {
  console.log(`server running on ${url}`)
})

import { ApolloClient, InMemoryCache } from '@apollo/client'
import { GET_FAVORITES } from './queries'

export const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          movies: {
            merge(existing, incoming) {
              return incoming
            }
          }
        }
      }
    }
  })
})

client.writeQuery({
  query: GET_FAVORITES,
  data: {
    favorites: []
  }
})

export default client

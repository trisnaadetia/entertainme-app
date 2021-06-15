import { gql } from '@apollo/client'

export const GET_ALL_DATA = gql`
  query getAllData {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tag
    }
    tvSeries {
      _id
      title
      overview
      poster_path
      popularity
      tag
    }
  }
`

export const GET_MOVIE_BY_ID = gql`
  query geMovieById($id: ID) {
    movie(_id: $id) {
      _id
      title
      overview
      poster_path
      popularity
      tag
    }
  }
`

export const GET_TVSERIE_BY_ID = gql`
  query geTvSeriesById($id: ID) {
    tvSerie(_id: $id) {
      _id
      title
      overview
      poster_path
      popularity
      tag
    }
  }
`

export const ADD_MOVIE = gql`
  mutation addMovie($input: InputMovie) {
    addMovie(newMovie: $input) {
      _id
      title
      overview
      poster_path
      popularity
      tag
    }
  }
`

export const UPDATE_MOVIE = gql`
  mutation updateMovie($id: ID, $input: InputMovie) {
    updateMovie(_id: $id, updateMovie: $input) {
      message
    }
  }
`

export const DELETE_MOVIE = gql`
  mutation deleteMovie($id: ID) {
    deleteMovie(_id:$id) {
      message
    }
  }
`

export const GET_FAVORITES = gql`
  query getFavorites {
    favorites @client
  }
`
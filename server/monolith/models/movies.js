const { ObjectID } = require('bson')
const { getDatabase } = require('../config/mongodb')

class Movies {
  static find() {
    return getDatabase().collection('movies').find().toArray()
  }

  static findById(id) {
    const query = { _id: ObjectID(id)}
    return getDatabase().collection('movies').findOne(query)
  }

  static postMovie(newMovie) {
    return getDatabase().collection('movies').insertOne(newMovie)
  }

  static deleteMovie(id) {
    const query = { _id: ObjectID(id)}
    return getDatabase().collection('movies').deleteOne(query)
  }

  static updateMovie(id, newUpdate) {
    const query = { _id: ObjectID(id)}
    const updateDoc = {
      $set: newUpdate
    }
    return getDatabase().collection('movies').updateOne(query, updateDoc)
  }
}

module.exports = Movies
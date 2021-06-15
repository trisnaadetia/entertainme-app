const { ObjectID } = require('bson')
const { getDatabase } = require('../config/mongodb')

class TvSeries {
  static find() {
    return getDatabase().collection('tvSeries').find().toArray()
  }

  static findById(id) {
    const query = { _id: ObjectID(id)}
    return getDatabase().collection('tvSeries').findOne(query)
  }

  static postTvSeries(newTvSeries) {
    return getDatabase().collection('tvSeries').insertOne(newTvSeries)
  }

  static deleteTvSeries(id) {
    const query = { _id: ObjectID(id)}
    return getDatabase().collection('tvSeries').deleteOne(query)
  }

  static updateTvSeries(id, newUpdate) {
    const query = { _id: ObjectID(id)}
    const updateDoc = {
      $set: newUpdate
    }
    return getDatabase().collection('tvSeries').updateOne(query, updateDoc)
  }
}

module.exports = TvSeries
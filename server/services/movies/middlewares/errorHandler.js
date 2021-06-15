function errorHandler(err, req, res, next) {
  if(err.name === 'errorDeleted') {
    res.status(400).json({ message: "Deleted error no documents matched "})
  } else if(err.name === 'errorUpdated') {
    res.status(400).json({ message: "Updated error no documents matched "})
  } else if(err.name === 'errorPost') {
    res.status(400).json({ message: "Post data error"})
  }  else {
    res.status(500).json({ message: err.message || 'internal server error' })
  }
}

module.exports = errorHandler
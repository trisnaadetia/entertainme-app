const express = require('express')
const app = express()
const PORT = process.env.PORT || 4002
const { connect } = require('./config/mongodb')
const routes = require('./routes')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use(routes)

app.use(errorHandler)

connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log('app listen on port ', PORT)
    })
  })
const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
const cors = require('cors')
const routes = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use(routes)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log('app listen on port ', PORT)
})
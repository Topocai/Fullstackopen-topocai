const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')

const mongoose = require('mongoose')

const config = require('./utils/config')
const loggers = require('./utils/loggers')
const middlewares = require('./utils/middlewares')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const mongoUrl = config.MONGODB_URI
mongoose.set('strictQuery', false)
mongoose.connect(mongoUrl)
.then(() => loggers.info('[MONGOOSE] connected to MongoDB'))
.catch(error => loggers.error('[MONGOOSE] Error connecting to mongoDB:', error.message))

app.use(cors())
app.use(express.json())

app.use(middlewares.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if(config.NODE_ENV === 'test') { // Added in part5
  const testingRouter = require('./controllers/test')
  app.use('/api/testing', testingRouter)
}

app.use(middlewares.unkownEndpoint)
app.use(middlewares.errorHandler)

module.exports = app
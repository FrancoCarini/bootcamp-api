const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const fileupload = require('express-fileupload')
const errorHandler = require('./middlewares/errors')
const connectDB = require('./config/db')

//Load env vars
dotenv.config({path: './config/config.env'})

//Connection to DB
connectDB()

//Route Files
const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')

const app = express()

//Body Parser
app.use(express.json())

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//File Upload
app.use(fileupload())

console.log(path.join(__dirname, 'public'))

//Set static folder
app.use(express.static(path.join(__dirname, 'public')))

//Mount Routers
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)

//Error Handler Middleware
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`)
  //Close server and exit process
  server.close(() => process.exit(1))
})
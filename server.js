const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const fileupload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const errorHandler = require('./middlewares/errors')
const connectDB = require('./config/db')

//Load env vars
dotenv.config({path: './config/config.env'})

//Connection to DB
connectDB()

//Route Files
const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')
const auth = require('./routes/auth')
const users = require('./routes/users')
const reviews = require('./routes/reviews')

const app = express()

//Body Parser
app.use(express.json())

//Cookie Parser
app.use(cookieParser())

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//File Upload
app.use(fileupload())

//Sanitize Data
app.use(mongoSanitize())

// Set security headers 
app.use(helmet())

// Prevent XSS attacks 
app.use(xss())

//Set static folder
app.use(express.static(path.join(__dirname, 'public')))

//Mount Routers
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)
app.use('/api/v1/auth', auth)
app.use('/api/v1/users', users)
app.use('/api/v1/reviews', reviews)

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
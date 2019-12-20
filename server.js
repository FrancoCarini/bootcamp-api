const express = require('express')
const dotenv = require('dotenv')

//Route Files
const bootcamps = require('./routes/bootcamps')

dotenv.config({path: './config/config.env'})

const app = express()

//Mount Routers
app.use('/api/v1/bootcamps', bootcamps)

const PORT = process.env.PORT || 5000

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})


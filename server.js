const express = require('express')
const dotenv = require('dotenv')

dotenv.config({path: './config/config.env'})

const app = express()

const PORT = process.env.PORT || 5000

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})


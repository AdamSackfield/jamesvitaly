// Dependencies
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const logger = require('morgan')
const cors = require('cors')
const chalk = require('chalk')
const bodyParser = require('body-parser')

// Server and Port Setup
const PORT = process.env.PORT || 8080;
const Server = express()

// Routes
const userRoutes = require('./routes/User') 

// Database Setup
mongoose.Promise = global.Promise;
mongoose
	.connect('mongodb://localhost:27017/pecs-app')
	.then(() => console.log(chalk.green('Connected to DB')))
  .catch(err => console.log(chalk.red(`Error connecting to DB. Error: ${err}`)));
  
// Middleware
Server.use(logger('dev'))
Server.use(cors())
Server.use(bodyParser.json())
Server.use('/api', userRoutes)

// Start Server
Server.listen(PORT, () => {
  console.log(chalk.green(`Server running on Port:${PORT}`))
})
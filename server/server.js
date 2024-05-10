require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3500

console.log(process.env.NODE_ENV)

connectDB()

app.use(logger)

// Allow other origin URLs to access the backend API
app.use(cors(corsOptions))

// Allow app to parse JSON files
app.use(express.json())

// Allow the use of cookies
app.use(cookieParser())

// Automatically access files in public directory
app.use('/', express.static(path.join(__dirname, 'public')))

// Routes for the backend API
app.use('/', require('./routes/root'))
app.use('/users', require('./routes/userRoutes'))
app.use('/projects', require('./routes/projectRoutes'))
app.use('/applications', require('./routes/applicationRoutes'))
//app.use('/saves', require('./routes/saveRoutes'))
app.use('/locations', require('./routes/locationRoutes'))
app.use('/categories', require('./routes/categoryRoutes'))

// Process 404 not found
app.all('*', (req, res) => { 
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})
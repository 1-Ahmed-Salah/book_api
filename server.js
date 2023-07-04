const express = require('express')
const connectDB = require('./config/db')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware')
const helmet = require('helmet')
const cors = require('cors')
require('dotenv').config()
require('colors')


const port = process.env.PORT || 5000

// Connect to the database
connectDB()

const app = express()

//Middleware
app.use(helmet())
app.use(cors({
    origin: `https://localhost:${port}`,
    
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//Routes Application
app.use('/api/v1/books', require('./routes/bookRoute'))
app.use('/api/v1/authors', require('./routes/authorRoute'))
app.use('/api/v1/auth', require('./routes/authRoute'))
app.use('/api/v1/users', require('./routes/userRoute'))

// Errors Middlewares
app.use(notFound)
app.use(errorHandler)

app.listen(port, _ => console.log(`listening on port: ${port}`.bgMagenta));


const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database connected to ${conn.connection.host}`.bgGreen)
    } catch (err) {
        console.log(`Database connection error: ${err}`)
        process.exit(1)
    }
}

module.exports = connectDB
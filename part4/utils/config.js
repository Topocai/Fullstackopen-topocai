require('dotenv').config()

const MONGODB_URI = process.env.MONGOURI
const PORT = process.env.PORT || 3001

module.exports = {
    MONGODB_URI,
    PORT
}
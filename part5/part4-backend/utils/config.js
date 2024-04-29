require('dotenv').config()

const MONGODB_URI = process.env.NODE_ENV !== 'production' ? process.env.MONGOURI_TEST : process.env.MONGOURI
const PORT = process.env.PORT || 3001
const NODE_ENV = process.env.NODE_ENV

module.exports = {
    MONGODB_URI,
    PORT,
    NODE_ENV
}
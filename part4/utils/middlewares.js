const { response } = require('../app')
const logger = require('./loggers')

const requestLogger = (req, res, next) => {
    let logText = `${req.method} ${req.path}`
    const reqBody = {...req.body}
    if(reqBody.password) {
        reqBody.password = '******'
    }
    logText += Object.keys(reqBody).length > 0 ? ` - [REQ BODY BELOW]\n${JSON.stringify(reqBody)}`: ''
    logger.info(logText, "--------")
    
    next()
}

const unkownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
    logger.error(error.message)

    if(error.name === 'ValidationError')  {
        return res.status(400).json({error: error.message})
    }
    else if(error.message.includes('E11000 duplicate key error')) {
        return res.status(409).json({error: `Expected unique value for ${Object.keys(error.keyValue)[0]}`})
    }
        

    next()
}

module.exports = {
    requestLogger,
    unkownEndpoint,
    errorHandler
}
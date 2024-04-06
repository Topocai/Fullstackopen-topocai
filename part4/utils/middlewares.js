const logger = require('./loggers')

const requestLogger = (req, res, next) => {
    let logText = `${req.method} ${req.path}`
    logText += Object.keys(req.body).length > 0 ? ` - [REQ BODY BELOW]\n${JSON.stringify(req.body)}`: ''
    logger.info(logText, "--------")
    
    next()
}

const unkownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
    logger.error(error.message)

    next()
}

module.exports = {
    requestLogger,
    unkownEndpoint,
    errorHandler
}
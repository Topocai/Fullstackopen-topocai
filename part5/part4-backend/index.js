const app = require('./app');
const loggers = require('./utils/loggers')
const config = require('./utils/config')

app.listen(config.PORT, () => loggers.info(`Server running on port ${config.PORT}`))
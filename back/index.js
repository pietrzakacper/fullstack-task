const startServer = require('./server')
const { initDB } = require('./db/init')

initDB()
startServer(3001)

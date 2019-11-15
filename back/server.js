const express = require('express')
const loginRouter = require('./routes/login')
const getListRouter = require('./routes/getList')
const addItemRouter = require('./routes/addItem')

function supportCors(req, res, next) {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000')

    if(req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE')
        res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

        return res.sendStatus(200)
    }

    next()
}

function startServer(port) {
    const app = express()

    app.use(supportCors)
    app.use(loginRouter)
    app.use(getListRouter)
    app.use(addItemRouter)

    app.listen(port, () => console.log(`App is listening on port ${port}`))
}

module.exports = startServer
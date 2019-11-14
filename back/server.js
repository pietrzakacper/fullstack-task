const express = require('express')
const bodyParser = require('body-parser')
const loginRouter = require('./routes/login')

function supportCors(req, res, next) {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000')

    if(req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE')
        res.set('Access-Control-Allow-Headers', 'Content-Type')

        return res.sendStatus(200)
    }

    next()
}

function startServer(port) {
    const app = express()

    app.use(bodyParser.json())
    app.use(supportCors)
    app.use(loginRouter)

    app.listen(port, () => console.log(`App is listening on port ${port}`))
}

module.exports = startServer
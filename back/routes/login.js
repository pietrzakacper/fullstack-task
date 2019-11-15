const express = require('express')
const bodyParser = require('body-parser')
const { authUser, fetchUser } = require('../db/users')
const { createSession } = require('../session')

async function login(req, res) {
    const { username, password } = req.body

    const isUserAuthenticated = await authUser(username, password)
    if(!isUserAuthenticated) {
        return res.status(401).send('Incorrect username or password')
    }

    const user = await fetchUser(username)
    const sessionId = createSession(username)

    res.status(200).json({
        sessionId,
        isAdmin: user.isAdmin
    })
}

const loginRouter = new express.Router()
loginRouter.post('/login', bodyParser.json(), login)

module.exports = loginRouter
const express = require('express')
const { getUser, createSession } = require('../db')

function login(req, res) {
    const { username, password } = req.body

    try {
        getUser(username, password)
    } catch(e) {
        return res.status(401).send('Incorrect username or password')
    }

    const sessionId = createSession(username)

    res.status(200).json({
        sessionId
    })
}

const loginRouter = new express.Router()
loginRouter.post('/login', login)

module.exports = loginRouter
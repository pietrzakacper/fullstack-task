const express = require('express')
const bodyParser = require('body-parser')
const { fetchUser } = require('../db/users')
const { insertItem } = require('../db/list')
const { withSession } = require('../session')

async function addItem(req, res) {
    const { username } = req.session

    const user = await fetchUser(username)

    if(!user.isAdmin) {
        return res.sendStatus(401)
    }

    const { newItemContent } = req.body

    await insertItem(newItemContent)

    res.sendStatus(200)
}

const addItemRouter = new express.Router()

addItemRouter.post('/addItem', withSession, bodyParser.json(), addItem)

module.exports = addItemRouter
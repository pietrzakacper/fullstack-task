const express = require('express')
const { fetchList } = require('../db/list')
const { withSession } = require('../session')

async function getList(req, res) {
    const items = await fetchList()
    res.status(200).json({ items })
}

const getListRouter = new express.Router()
getListRouter.get('/getList', withSession, getList)

module.exports = getListRouter
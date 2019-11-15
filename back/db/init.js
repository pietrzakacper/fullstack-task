const { createUser } = require('./users')
const { insertItem } = require('./list')

function initDB() {
    const {  ADMIN_USER, ADMIN_PASSWORD, USER , PASSWORD } = process.env

    createUser(ADMIN_USER, ADMIN_PASSWORD, true)
    createUser(USER, PASSWORD)

    insertItem('### Beginning of the list ###')
}

module.exports = {
    initDB
}
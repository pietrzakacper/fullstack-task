const uuidv1 = require('uuid/v1')
const crypto = require('crypto')

const db = {}
/*
    DB {
        [username: string]: {
            salt: string,
            passwordHash: string,
            sessionId: string
        }
    }
*/

createInitialUser()

function createInitialUser() {
    const {  USER , PASSWORD } = process.env

    const salt = uuidv1()
    const passwordHash = hashPassword(PASSWORD, salt)

    db[USER] = { salt, passwordHash }
}

function hashPassword(password, salt) {
    return crypto.createHash('sha256').update(password).update(salt).digest('base64')
}

// This function should have a relatively constant time of execution, regardless of the parameters to prevent guessing correct username by the attacker based on response time
const mockSalt = uuidv1()
function getUser(username, password) {
    const user = db[username]

    const salt = (user && user.salt) || mockSalt
    // mockSalt is used for having the same hashing time regardless of whether the user exists or not
    const inputPasswordHash = hashPassword(password, salt)
    if(!user || inputPasswordHash !== user.passwordHash) {
        throw new Error('Incorrect username or password')
    }

    return user
}

function createSession(username) {
    return db[username].sessionId = uuidv1()
}

module.exports = {
    getUser,
    createSession
}
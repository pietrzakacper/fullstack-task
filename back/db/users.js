const uuidv1 = require('uuid/v1')
const crypto = require('crypto')

/*
    UsersDB {
        [username: string]: {
            salt: string,
            passwordHash: string,
            isAdmin: boolean
        }
    }
*/
const usersDB = {}

async function createUser(username, password, isAdmin = false) {
    const salt = generateSalt()
    const passwordHash = hashPassword(password, salt)

    usersDB[username] = { salt, passwordHash, isAdmin }
}

function generateSalt() {
    return crypto.randomBytes(32).toString('hex')
}

function hashPassword(password, salt) {
    return crypto.createHash('sha256').update(password).update(salt).digest('base64')
}

// This function should have a relatively constant time of execution, regardless of the parameters to prevent guessing correct username by the attacker based on response time
const mockSalt = generateSalt()
async function authUser(username, password) {
    const user = usersDB[username]

    const salt = (user && user.salt) || mockSalt
    // mockSalt is used for having the same hashing time regardless of whether the user exists or not
    const inputPasswordHash = hashPassword(password, salt)
    if(user && inputPasswordHash === user.passwordHash) {
        return true
    }

    return false
}

async function fetchUser(username) {
    return usersDB[username]
}

module.exports = {
    authUser,
    fetchUser,
    createUser
}
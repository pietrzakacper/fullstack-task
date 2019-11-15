
const uuidv1 = require('uuid/v1')

/*
    Sessions {
        [sessionId: string]: {
            username: string
        }
    }
*/
const sessions = {}

function createSession(username) {
    const sessionId =  uuidv1()
    sessions[sessionId] = { username }

    return sessionId
}

function withSession(req, res, next) {
    const sessionId = req.get('Authorization')
    const session = sessions[sessionId]

    if(!session) {
        return res.sendStatus(401)
    }

    req.session = session

    next()
}

module.exports = {
    createSession,
    withSession
}
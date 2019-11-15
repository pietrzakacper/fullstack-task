const addItemRouter = require('./addItem')
const supertest = require('supertest')
const { createSession } = require('../session')
const { createUser } = require('../db/users')
const app = require('express')()

app.use(addItemRouter)

const server = app.listen(3333)
const request = supertest(app)

describe('Endpoint /addItem', () => {
    afterAll(() => server.close())

    test('should return 401 to regular user', async () => {
        const username = 'johnny'
        await createUser(username, 'password123')
        const sessionId = createSession(username)

        const res = await request.post('/addItem')
            .set('Authorization', sessionId)
            .send({newItemContent: 'Recipe for tomato soup'})

        expect(res.status).toBe(401)
    })

    test('should return 200 to admin', async () => {
        const username = 'admin'
        await createUser(username, 'admin123', true)
        const sessionId = createSession(username)

        const res = await request.post('/addItem')
            .set('Authorization', sessionId)
            .send({newItemContent: 'Recipe for tomato soup'})

        expect(res.status).toBe(200)
    })
})

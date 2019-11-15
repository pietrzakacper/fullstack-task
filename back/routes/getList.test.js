const getListRouter = require('./getList')
const supertest = require('supertest')
const { createSession } = require('../session')
const app = require('express')()

app.use(getListRouter)

const server = app.listen(3333)
const request = supertest(app)

describe('Endpoint /getList', () => {
    afterAll(() => server.close())

    test('should return 401 to unlogged user', async () => {
        const res = await request.get('/getList')
        expect(res.status).toBe(401)
    })

    test('should return a list to logged user', async () => {
        const sessionId = createSession('johnny123')
        const res = await request.get('/getList').set('Authorization', sessionId)

        expect(res.status).toBe(200)
        expect(res.body).toEqual(expect.objectContaining({
            items: expect.any(Array)
        }))
    })
})

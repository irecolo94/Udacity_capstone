import {app} from '../src/server/index'
const supertest = require('supertest')
const request = supertest(app)

it('tests default endpoint', async done => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    done()
  })

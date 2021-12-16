const request = require('supertest')
const server = require('./api/server.js')

describe('server.js', () => {
  describe('index route', () => {
    it('should return a 200(OKAY) status code from the index route', async () => {
      const expectedStatusCode = 200
      const response = await request(server).get('/')
      expect(response.status).toEqual(expectedStatusCode)
    })

    it('should return a JSON object from the index route', async () => {
      const response = await request(server).get('/')
      expect(response.type).toEqual('application/json')
    })

    it('should return the JSON object ({ message: "this works!" }) from the index route', async () => {
      const expectedBody = { message: 'this works!' }
      const response = await request(server).get('/')
      expect(response.body).toEqual(expectedBody)
    })
  })
})

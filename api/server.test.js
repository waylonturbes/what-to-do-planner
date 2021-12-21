const request = require("supertest")
const server = require("./server.js")

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

describe("[POST] /api/auth/login", () => {
  describe("success", () => {
    let res
    beforeAll(async () => {
      res = await request(server)
        .post("/api/auth/login")
        .send({
          username: "john_snow",
          password: "john_snow"
        })
    })

    it("responds with status 200", async () => {
      const expected = 200
      const actual = res.status
      expect(actual).toBe(expected)
    })

    it("returns message 'Welcome, USERNAME!", async () => {
      const expected = /welcome, john_snow/i
      const actual = res.body.message
      expect(actual).toMatch(expected)
    })

    it("returns login token", async () => {
      const expected = "token"
      const actual = res.body
      expect(actual).toHaveProperty(expected)
    })
  })

  describe("failure", () => {
    it("responds with status 401", async () => {
      const expected = 401
      const res = await request(server)
        .post("/api/auth/login")
      const actual = res.status
      expect(actual).toBe(expected)
    })

    it("returns message 'username is required' when missing", async () => {
      const expected = /username is required/i
      const res = await request(server)
        .post("/api/auth/login")
        .send({
          password: "testing"
        })
      const actual = res.body.message
      expect(actual).toMatch(expected)
    })

    it("returns message 'password is required' when missing", async () => {
      const expected = /password is required/i
      const res = await request(server)
        .post("/api/auth/login")
      const actual = res.body.message
      expect(actual).toMatch(expected)
    })
  })
})

describe("[POST] /api/auth/register", () => {
  describe("success", () => {
    let res
    beforeAll(async () => {
      res = await request(server)
        .post("/api/auth/register")
        .send({
          first_name: "John",
          last_name: "Snow",
          email: "john_snow@castleblack.net",
          username: "john_snow",
          password: "king_of_the_north"
        })
    })

    it("responds with status 201", async () => {
      const expected = 201
      const actual = res.status
      expect(actual).toBe(expected)
    })

    it("returns message 'user registered, successfully!'", async () => {
      const expected = /user registered, successfully/i
      const actual = res.body.message
      expect(actual).toMatch(expected)
    })
  })

  describe("failure", () => {
    it("responds with status 401", async () => {
      const expected = 401
      const res = await request(server)
        .post("/api/auth/register")
      const actual = res.status
      expect(actual).toBe(expected)
    })

    describe("invalid username", () => {
      it("returns message 'username is required'", async () => {
        const expected = /username is required/i
        const res = await request(server)
          .post("/api/auth/register")
          .send({
            email: "john_snow@castleback.net",
            password: "testing"
          })
        const actual = res.body.message
        expect(actual).toMatch(expected)
      })

      it("returns message 'username must contain at least 3 characters' when too short", async () => {
        const expected = /username must contain at least 3 characters/i
        const res = await request(server)
          .post("/api/auth/register")
          .send({
            username: "a",
            email: "john_snow@castleback.net",
            password: "testing"
          })
        const actual = res.body.message
        expect(actual).toMatch(expected)
      })
    })

    describe("invalid password", () => {
      it("returns message 'password is required' when missing", async () => {
        const expected = /password is required/i
        const res = await request(server)
          .post("/api/auth/register")
          .send({
            username: "john_snow",
            email: "john_snow@castleback.net"
          })
        const actual = res.body.message
        expect(actual).toMatch(expected)
      })

      it("returns message 'password must contain at least 6 characters' when too short", async () => {
        const expected = /password must contain at least 6 characters/i
        const res = await request(server)
          .post("/api/auth/register")
          .send({
            username: "john_snow",
            email: "john_snow@castleback.net",
            password: "test"
          })
        const actual = res.body.message
        expect(actual).toMatch(expected)
      })
    })

    describe("invalid email", () => {
      it("returns message 'email address is required' when missing", async () => {
        const expected = /email address is required/i
        const res = await request(server)
          .post("/api/auth/register")
          .send({
            username: "john_snow",
            password: "testing"
          })
        const actual = res.body.message
        expect(actual).toMatch(expected)
      })

      it("returns message 'invalid email address' when misformatted", async () => {
        const expected = /invalid email address/i
        const res = await request(server)
          .post("/api/auth/register")
          .send({
            username: "john_snow",
            email: "john_snow",
            password: "testing"
          })
        const actual = res.body.message
        expect(actual).toMatch(expected)
      })
    })
  })
})

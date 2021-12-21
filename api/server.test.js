const request = require("supertest")
const db = require("../data/db-config")
const server = require("./server.js")

const { TEST_PASSWORD } = require("./config")

// Reset db before testing
beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})

// Sanity Check
describe("sanity check", () => {
  test("matchers are functional", () => {
    expect(true).toBe(true)
    expect(2 + 2).toBe(4)
    expect(9 + 10).not.toBe(21)
  })

  test("testing environment is set", () => {
    const expected = /testing/i
    const actual = process.env.NODE_ENV
    expect(actual).toMatch(expected)
  })
})

describe("[GET] /", () => {
  let res
  beforeAll(async () => {
    res = await request(server).get("/")
  })

  it("responds with status 200", async () => {
    const expected = 200
    const actual = res.status
    expect(actual).toBe(expected)
  })

  it("returns message 'this works!'", async () => {
    const expected = /this works/i
    const actual = res.body.message
    expect(actual).toMatch(expected)
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
          password: TEST_PASSWORD
        })
    })

    it("responds with status 200", () => {
      const expected = 200
      const actual = res.status
      expect(actual).toBe(expected)
    })

    it("returns message 'Welcome, USERNAME!'", () => {
      const expected = /welcome, john_snow/i
      const actual = res.body.message
      expect(actual).toMatch(expected)
    })

    it("returns login token", () => {
      const expected = "token"
      const actual = res.body
      expect(actual).toHaveProperty(expected)
    })
  })

  describe("failure", () => {
    describe("misformatted/invalid request body", () => {
      it("responds with status 400", async () => {
        const expected = 400
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

    describe("non-existent user", () => {
      let res
      beforeAll(async () => {
        res = await request(server)
          .post("/api/auth/login")
          .send({
            username: "testing",
            password: "testing"
          })
      })

      it("responds with status 404", () => {
        const expected = 404
        const actual = res.status
        expect(actual).toBe(expected)
      })

      it("returns message 'user does not exist'", () => {
        const expected = /user does not exist/i
        const actual = res.body.message
        expect(actual).toMatch(expected)
      })
    })

    describe("wrong password", () => {
      let res
      beforeAll(async () => {
        res = await request(server)
          .post("/api/auth/login")
          .send({
            username: "john_snow",
            password: "wrong_password"
          })
      })

      it("responds with status 401", () => {
        const expected = 401
        const actual = res.status
        expect(actual).toBe(expected)
      })

      it("returns message 'invalid credentials'", () => {
        const expected = /invalid credentials/i
        const actual = res.body.message
        expect(actual).toMatch(expected)
      })
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
          first_name: "Ulfric",
          last_name: "Stormcloak",
          email: "ustormcloak@windhelm.net",
          username: "ulfric_stormcloak",
          password: "true_high_king"
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
    describe("misformatted username", () => {
      it("responds with status 400", async () => {
        const expected = 400
        const res = await request(server)
          .post("/api/auth/register")
        const actual = res.status
        expect(actual).toBe(expected)
      })

      it("returns message 'username is required' when missing", async () => {
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

    describe("username taken", () => {
      let res
      beforeAll(async () => {
        res = await request(server)
          .post("/api/auth/register")
          .send({
            username: "john_snow",
            email: "john_snow@castleback.net",
            password: "testing"
          })
      })

      it("responds with status 409", () => {
        const expected = 409
        const actual = res.status
        expect(actual).toBe(expected)
      })

      it("returns message 'username already taken'", () => {
        const expected = /username already taken/i
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

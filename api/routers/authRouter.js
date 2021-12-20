const router = require("express").Router()
const {
  validateLoginInput,
  validateRegisterInput
} = require("../middleware/authMiddleware")

router.post("/login",
  validateLoginInput,
  async (req, res, next) => {
    try {
      const { username } = req.body
      res.status(200).json({
        message: `Welcome, ${username}!`,
        token: "fake token"
      })
    } catch (err) {
      next(err)
    }
  }
)

router.post("/register",
  validateRegisterInput,
  async (req, res, next) => {
    try {
      res.status(201).json({
        message: "New user registered, successfully!"
      })
    } catch (err) {
      next(err)
    }
  }
)

module.exports = router

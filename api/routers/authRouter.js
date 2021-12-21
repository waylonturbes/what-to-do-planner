const router = require("express").Router()
const bcrypt = require("bcryptjs")

const User = require("../models/usersModel")
const { buildToken } = require("../utils/tokenUtils")

const {
  validateLoginInput,
  validateRegisterInput,
  checkUserExists,
  checkUsernameTaken
} = require("../middleware/authMiddleware")

const { BCRYPT_ROUNDS } = require("../config")

router.post("/login",
  validateLoginInput,
  checkUserExists,
  async (req, res, next) => {
    try {
      // Check if the password is correct
      const { password } = req.body
      const user = req._user
      const passwordIsValid = bcrypt.compareSync(password, user.password)

      // Deny access if invalid
      if (!passwordIsValid) {
        return next({
          status: 401,
          message: "Invalid Credentials!"
        })
      }

      // If all good, send a response with a new login token
      res.status(200).json({
        message: `Welcome, ${user.username}!`,
        token: buildToken(user)
      })
    } catch (err) {
      next(err)
    }
  }
)

router.post("/register",
  validateRegisterInput,
  checkUsernameTaken,
  async (req, res, next) => {
    try {
      // Hash the password from the request body
      const hash = bcrypt.hashSync(req.body.password, BCRYPT_ROUNDS)

      // Register a new user with the information provided
      const registration = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        username: req.body.username,
        password: hash
      }
      const newUser = await User.add(registration)
      res.status(201).json({
        message: "New user registered, successfully!",
        userInfo: newUser
      })
    } catch (err) {
      next(err)
    }
  }
)

module.exports = router

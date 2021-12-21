const User = require("../models/usersModel")
const { loginSchema, registerSchema } = require("../schemas/authSchema")

async function validateLoginInput(req, res, next) {
  try {
    await loginSchema.validate(req.body)
    next()
  } catch (err) {
    next({
      status: 400,
      message: err.errors[0]
    })
  }
}

async function validateRegisterInput(req, res, next) {
  try {
    await registerSchema.validate(req.body)
    next()
  } catch (err) {
    next({
      status: 400,
      message: err.errors[0]
    })
  }
}

async function checkUserExists(req, res, next) {
  const { username } = req.body
  const [existingUser] = await User.getBy({ username })

  if (existingUser === undefined) {
    return next({
      status: 404,
      message: "user does not exist"
    })
  }

  req._user = existingUser
  next()
}

async function checkUsernameTaken(req, res, next) {
  const { username } = req.body
  const [existingUser] = await User.getBy({ username })

  if (existingUser) {
    return next({
      status: 409,
      message: "username already taken"
    })
  }

  next()
}

module.exports = {
  validateLoginInput,
  validateRegisterInput,
  checkUserExists,
  checkUsernameTaken
}

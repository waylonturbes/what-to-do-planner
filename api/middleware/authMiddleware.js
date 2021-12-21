const { loginSchema, registerSchema } = require("../schemas/authSchema")

async function validateLoginInput(req, res, next) {
  try {
    await loginSchema.validate(req.body)
    next()
  } catch (err) {
    next({
      status: 401,
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
      status: 401,
      message: err.errors[0]
    })
  }
}

module.exports = {
  validateLoginInput,
  validateRegisterInput
}

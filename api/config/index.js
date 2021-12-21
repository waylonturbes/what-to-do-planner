require("dotenv").config()

const globalConfig = {
  PORT: parseInt(process.env.PORT) || 9000,
  JWT_SECRET: process.env.JWT_SECRET || "animal_cookies",
  DB_URL_DEV: process.env.DB_URL_DEV || "dev db url missing",
  DB_URL_TEST: process.env.DB_URL_TEST || "test db url missing",
  NODE_ENV: process.env.NODE_ENV || "development"
}

module.exports = globalConfig

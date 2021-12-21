const knex = require("knex")
const { NODE_ENV } = require("../api/config")
const knexConfig = require("../knexfile.js")

const environment = NODE_ENV

module.exports = knex(knexConfig[environment])

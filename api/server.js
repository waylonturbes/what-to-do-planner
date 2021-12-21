const express = require("express")
const cors = require("cors")
const helmet = require("helmet")

const authRouter = require("./routers/authRouter")

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())

server.use("/api/auth", authRouter)

server.get("/", (req, res) => {
  res.status(200).json({ message: "this works!" })
})

// Error handler
server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message || "oh, no!"
  })
})

module.exports = server

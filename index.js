const { PORT } = require("./api/config")
const server = require('./api/server.js')

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`)
})

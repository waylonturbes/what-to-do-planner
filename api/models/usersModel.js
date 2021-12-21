const db = require("../../data/db-config")

async function getAll() {
  const users = await db("users")
    .select("user_id as id",
      "username",
      "email",
      "first_name",
      "last_name")
    .orderBy("user_id")
  return users
}

async function getBy(filter) {
  const users = await db("users")
    .select("user_id as id",
      "username",
      "password",
      "email",
      "first_name",
      "last_name")
    .where(filter)
    .orderBy("user_id")
  return users
}

async function add(userInfo) {
  const [newUser] = await db("users")
    .insert(userInfo)
    .returning([
      "user_id",
      "first_name",
      "last_name",
      "username",
      "email"
    ])
  return {
    id: newUser.user_id,
    name: `${newUser.first_name} ${newUser.last_name}`,
    username: newUser.username,
    email: newUser.email
  }
}

module.exports = {
  getAll,
  getBy,
  add
}

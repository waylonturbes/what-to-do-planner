
exports.up = async function (knex) {
  return await knex.schema
    .createTable("users", table => {
      table.increments("user_id")
      table.string("first_name")
      table.string("last_name")
      table.string("username")
      table.string("user_id")
    })
};

exports.down = async function (knex) {
  return await knex.schema
    .dropTableIfExists("users")
};

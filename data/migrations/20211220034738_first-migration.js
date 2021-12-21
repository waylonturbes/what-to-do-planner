exports.up = async function (knex) {
  return await knex.schema
    .createTable("users", table => {
      table.increments("user_id")
        .primary()
      table.string("first_name")
      table.string("last_name")
      table.string("email")
        .notNullable()
        .unique()
      table.string("username")
        .notNullable()
        .unique()
      table.string("password")
        .notNullable()
    })
};

exports.down = async function (knex) {
  return await knex.schema
    .dropTableIfExists("users")
};

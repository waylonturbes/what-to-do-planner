const users = [
  {
    username: "john_snow",
    password: "$2a$08$jFMLs4fOnjcQS15eVbtlsOT7O2zCcY9r2MBoNrgmrhB.Jam7VOHoO",
    email: "johnsnow@castleblack.net",
    first_name: "John",
    last_name: "Snow"
  }
]

exports.seed = function (knex) {
  return knex("users").insert(users)
}

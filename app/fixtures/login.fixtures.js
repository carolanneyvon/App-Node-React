const { faker } = require("@faker-js/faker/locale/fr");
const db = require("../models/Db.class.js");

// Find available creators (all users with role dealer)
module.exports = db.models.user
  .findAll()
  .then((data) => customer_fixtures(data))
  .catch((err) => {
    console.log(`catch err`, err);
  });

const customer_fixtures = (users_data) =>
  users_data.map((user) => {
    return {
      model: "login",
      data: {
        identifier: user.firstname.toLowerCase(),
        password: "password", // just for easy test
        userId: user.id,
      },
    };
  });

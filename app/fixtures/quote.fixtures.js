const { faker } = require("@faker-js/faker/locale/fr");
const { random_number } = require("../utils/");
const ENUM = require("../config/enum.config.js");
const db = require("../models/Db.class.js");

// Find available creators (all users with role dealer)
module.exports = db.models.user
  .findAllCreator()
  .then((data) => quote_fixtures(data))
  .catch((err) => {
    console.log(`catch err`, err);
  });

const quote_fixtures = (creators_data) => {
  const creator_ids = creators_data.map((user) => user.id);
  const quotes = [];
  for (let index = 0; index < 40; index++) {
    // Quote fixture
    quotes.push({
      model: "quote",
      data: {
        creatorId: faker.helpers.arrayElement(creator_ids),
        customerId: random_number(1, 12),
        vehicleId: random_number(1, 50),
        status: faker.helpers.arrayElement(Object.values(ENUM.quote.status)),
      },
    });
  }
  return quotes;
};

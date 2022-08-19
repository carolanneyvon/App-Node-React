const { faker } = require("@faker-js/faker/locale/fr");
const ENUM = require("../config/enum.config.js");
const db = require("../models/Db.class.js");

const condition_quote_accepted = {
  where: { status: { [db.Sequelize.Op.eq]: `${ENUM.quote.status.accepted}` } },
};

// Find available creators (all users with role dealer)
module.exports = db.models.quote
  .findAll(condition_quote_accepted)
  .then((data) => order_fixtures(data))
  .catch((err) => {
    console.log(`catch err`, err);
  });

const order_fixtures = (quote_accepted_data) => {
  // one order for one quote accepted
  let quote_ids_available = quote_accepted_data.map((quote) => quote.id);

  const orders = [];
  for (let index = 0; index < quote_accepted_data.length; index++) {
    const id = faker.helpers.arrayElement(quote_ids_available);
    // Unset the quote id from the available quote ids
    quote_ids_available = quote_ids_available.filter(
      (element) => element !== id
    );

    // Order fixture
    orders.push({
      model: "order",
      data: {
        quoteId: id,
        priority: faker.helpers.arrayElement(
          Object.values(ENUM.order.priority)
        ),
      },
    });
  }
  return orders;
};

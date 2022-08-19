const { faker } = require("@faker-js/faker/locale/fr");
const db = require("../models/Db.class.js");

// Find available creators (all users with role dealer)
module.exports = db.models.order
  .findAll()
  .then((data) => invoice_fixtures(data))
  .catch((err) => {
    console.log(`catch err`, err);
  });

const invoice_fixtures = (order_data) => {
  // one order for one quote accepted
  let order_ids_available = order_data.map((quote) => quote.id);

  const invoices = [];
  for (let index = 0; index < order_data.length / 2; index++) {
    const id = faker.helpers.arrayElement(order_ids_available);
    // Unset the quote id from the available quote ids
    order_ids_available = order_ids_available.filter(
      (element) => element !== id
    );

    // Invoice fixture
    invoices.push({
      model: "invoice",
      data: {
        orderId: id,
        sellingPrice: faker.finance.amount(6000, 30000, 1),
      },
    });
  }
  return invoices;
};

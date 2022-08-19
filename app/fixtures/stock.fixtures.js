const { faker } = require("@faker-js/faker/locale/fr");
const { random_number } = require("../utils/");

const stocks = [];
for (let index = 0; index < 50; index++) {
  // Stock fixture
  stocks.push({
    model: "stock",
    data: {
      vehicleId: random_number(1, 50),
      quantity: random_number(0, 2),
    },
  });
}

module.exports = stocks;

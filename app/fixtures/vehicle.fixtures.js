const { faker } = require("@faker-js/faker/locale/fr");
const { random_number } = require("../utils/");

const vehicles = [];
for (let index = 0; index < 50; index++) {
  // Vehicle fixture
  vehicles.push({
    model: "vehicle",
    data: {
      model: faker.vehicle.model(),
      manufacturer: faker.vehicle.manufacturer(),
      type: faker.vehicle.type(),
      description: faker.lorem.sentence(),
      price: faker.finance.amount(6000, 30000, 1),
    },
  });
}

module.exports = vehicles;

const { faker } = require("@faker-js/faker/locale/fr");
const team_digi = require("./team_digi.js");

// User fixture
module.exports = Object.values(team_digi).map((namic) => {
  return {
    model: "user",
    data: {
      firstname: namic.name,
      lastname: faker.name.lastName(),
      role: namic.role,
      active: true,
    },
  };
});

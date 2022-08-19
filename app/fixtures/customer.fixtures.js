// const { random_number } = require("../utils/");
// const team_digi = require("./team_digi.js");
const { faker } = require("@faker-js/faker/locale/fr");
const student_digi = require("./student_digi.js");
const db = require("../models/Db.class.js");

// Find available creators (all users with role dealer)
module.exports = db.models.user
  .findAllCreator()
  .then((data) => customer_fixtures(data))
  .catch((err) => {
    console.log(`catch err`, err);
  });

const customer_fixtures = (creators_data) =>
  Object.values(student_digi).map((namic) => {
    const creator_ids = creators_data.map((user) => user.id);

    return {
      model: "customer",
      data: {
        firstname: namic.name,
        lastname: faker.name.lastName(),
        address: faker.address.streetAddress(),
        zip: faker.address.zipCode(),
        city: faker.address.city(),
        phone: faker.phone.number("+334########"),
        mobile: faker.phone.number("+336########"),
        creatorId: faker.helpers.arrayElement(creator_ids), // 4st try, random creator id from db
        // creatorId: random_number(3, 7),                                                  // 3rd try, random id between bounds 3 and 7 (cf team_digi.js)
        // creatorId: faker.random.numeric(1, {bannedDigits: ["0", "1", "2", "8", "9"]}),   // 2nd try, faker random equivalentas above
        // creatorId: Object.keys(team_digi).indexOf("jenny") + 1,                          // 1st try, specific creator, here : jenny
      },
    };
  });

const ENUM = require("../config/enum.config.js");
const orderId = require("order-id")("order");

// console.log("Date.now()", Date.now());
module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("order", {
    /**
     * Primary key 'id' auto added
     */
    number: {
      type: Sequelize.STRING,
      defaultValue: "O-" + orderId.generate(),
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM(Object.values(ENUM.order.status)),
      defaultValue: ENUM.order.status.new,
      allowNull: false,
    },
    priority: {
      type: Sequelize.ENUM(Object.values(ENUM.order.priority)),
      defaultValue: ENUM.order.priority.normal,
      allowNull: false,
    },
    /**
     * field 'createdAt' auto added
     */
    /**
     * field 'updatedAt' auto added
     */
  });

  const Quote = require("./quote.model.js")(sequelize, Sequelize);
  Order.belongsTo(Quote, { as: "quote", foreignKey: { allowNull: false } });

  return Order;
};

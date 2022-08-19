const orderId = require("order-id")("order");

module.exports = (sequelize, Sequelize) => {
  const Invoice = sequelize.define("invoice", {
    /**
     * Primary key 'id' auto added
     */
    number: {
      type: Sequelize.STRING,
      defaultValue: "I-" + orderId.generate(),
      allowNull: false,
    },
    sellingPrice: {
      type: Sequelize.DOUBLE(7, 2), // 7 digits, 2 decimals + return json number type whereas Sequelize.DECIMAL(7, 2) return json string
      allowNull: false,
    },
    /**
     * field 'createdAt' auto added
     */
    /**
     * field 'updatedAt' auto added
     */
  });

  const Order = require("./order.model.js")(sequelize, Sequelize);
  /**
   * foreign key order auto added to the invoice table
   */
  Invoice.belongsTo(Order, { foreignKey: { allowNull: false } });

  return Invoice;
};

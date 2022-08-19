module.exports = (sequelize, Sequelize) => {
  return {
    order_number: sequelize.define("order_number", {}),
    quote_number: sequelize.define("quote_number", {}),
    invoice_number: sequelize.define("invoice_number", {}),
  };
};

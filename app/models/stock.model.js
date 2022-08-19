module.exports = (sequelize, Sequelize) => {
  const Stock = sequelize.define("stock", {
    /**
     * Primary key 'id' auto added
     */
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    /**
     * field 'createdAt' auto added
     */
    /**
     * field 'updatedAt' auto added
     */
  });

  const Vehicule = require("./vehicle.model.js")(sequelize, Sequelize);
  Stock.belongsTo(Vehicule, { foreignKey: { allowNull: false } });

  return Stock;
};

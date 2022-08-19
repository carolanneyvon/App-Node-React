module.exports = (sequelize, Sequelize) => {
  const Vehicle = sequelize.define("vehicle", {
    /**
     * Primary key 'id' auto added
     */
    model: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    manufacturer: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.DOUBLE(7, 2), // 7 digits, 2 decimals + return json number type whereas Sequelize.DECIMAL(7, 2) return json string
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
    /**
     * field 'createdAt' auto added
     */
    /**
     * field 'updatedAt' auto added
     */
  });

  return Vehicle;
};

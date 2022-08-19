const ENUM = require("../config/enum.config.js");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    /**
     * Primary key 'id' auto added
     */
    firstname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      // To access enum values without config :  User.rawAttributes.role.values
      type: Sequelize.ENUM(Object.values(ENUM.user.role)),
      allowNull: false,
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    /**
     * field 'createdAt' auto added
     */
    /**
     * field 'updatedAt' auto added
     */
  });

  /**
   * Find all users witch have dealer role
   */
  User.findAllCreator = async () => {
    const condition = {
      where: { role: { [Sequelize.Op.eq]: `${ENUM.user.role.dealer}` } },
    };

    return await User.findAll(condition)
      .then((data) => data)
      .catch((err) => {
        console.log(`catch err`, err);
      });
  };

  return User;
};

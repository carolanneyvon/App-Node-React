const dbConfig = require("../config/db.config.js");
const { Sequelize, Op } = require("sequelize");

class Db {
  constructor() {
    // DB init by ORM Sequelize
    this.Sequelize = Sequelize;
    this.sequelize = this.getOrmInstance();

    // DB Model names used by orm
    this.models_name = [
      "user",
      "customer",
      "quote",
      "order",
      "invoice",
      "vehicle",
      "stock",
      "login",
    ];

    // DB Models
    this.models = {};
    this.models_name.map((model_name) => {
      this.models[model_name] = require(`./${model_name}.model.js`)(
        this.sequelize,
        this.Sequelize
      );
    });

    // Sequences Models
    const sequences_tables = require(`./seq_numbers.model.js`)(
      this.sequelize,
      this.Sequelize
    );
    Object.keys(sequences_tables).map((seq) => {
      this.models[seq] = sequences_tables[seq];
    });

    this.message = "Db: DB init success";
  }

  getOrmInstance() {
    return new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
      host: dbConfig.HOST,
      dialect: dbConfig.dialect,
      port: dbConfig.port,
      pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
      },
    });
  }
}

/**
 * Tips : Take avantage of Node.JS module caching machanism !
 * Node.JS will cache and reuse the same object each time it's required.
 * So, this instance of Db is a singleton !
 */
module.exports = new Db();

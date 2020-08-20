const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_ENGINE } = require("../configs");
const logger = require("../utils/logger");

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: DB_ENGINE,
  logging: (msg) => logger.debug(msg),
});

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    sequelize
      .authenticate()
      .then(() => {
        logger.debug("Database connection successful");
      })
      .catch((err) => {
        logger.error("Database connection error" + err);
      });
  }
}

exports.DatabaseInstance = new Database();
exports.SequelizeInstance = sequelize;

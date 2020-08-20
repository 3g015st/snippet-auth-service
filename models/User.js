const { SequelizeInstance } = require("../db");
const { USER_MODEL } = require("../reference/models-reference");
const OPTS = {
  timestamps: true,
};

const User = SequelizeInstance.define("User", USER_MODEL, OPTS);

(async () => await SequelizeInstance.sync())();

module.exports = User;

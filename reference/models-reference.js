const { Sequelize, DataTypes } = require("sequelize");

exports.USER_MODEL = {
  sidelineId: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mobileNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  socialId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastLoginDate: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

const { NOT_FOUND } = require("http-status-codes");
const logger = require("../utils/logger");

exports.errorHandler = (err, req, res, next) => {
  if (err) {
    logger.error(JSON.stringify(err));
    res.status(err.status).json(err);
  }
};

exports.notFoundResource = (req, res) => {
  res.status(NOT_FOUND).json({ msg: `Resource not found`, status: NOT_FOUND });
};

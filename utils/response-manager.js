const { INTERNAL_SERVER_ERROR, OK } = require("http-status-codes");
const SUCCESS = `res/success`;
const FAILED = "res/failed";

exports.SUCCESS = SUCCESS;
exports.FAILED = FAILED;

exports.responseManager = (res, flag) => (payload) => {
  const HTTP_STATUS_CODE = flag === SUCCESS ? OK : INTERNAL_SERVER_ERROR;
  res.status(HTTP_STATUS_CODE).json(payload);
};

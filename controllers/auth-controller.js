const { handleAuthSuccess$ } = require("../actions/auth-actions");
const {
  responseManager,
  SUCCESS,
  FAILED,
} = require("../utils/response-manager");

exports.handleAuthSuccess = (req, res) => {
  if (!req.user || !req.session) {
    res.redirect("/api/auth/facebook/auth-failed");
    return;
  }
  handleAuthSuccess$(req).subscribe(
    responseManager(res, SUCCESS),
    responseManager(res, FAILED)
  );
};

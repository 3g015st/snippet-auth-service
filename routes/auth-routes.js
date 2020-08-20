const express = require("express");
const router = express.Router();
const passport = require("passport");
const { UNAUTHORIZED, OK } = require("http-status-codes");

const { handleAuthSuccess } = require("../controllers/auth-controller");

router.get("/facebook", passport.authenticate("facebook"));
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/api/auth/facebook/auth-success",
    failureRedirect: "/api/auth/facebook/auth-failed",
  })
);
router.get("/facebook/auth-success", handleAuthSuccess);

router.get("/facebook/auth-failed", (req, res) =>
  res.status(UNAUTHORIZED).json({ msg: `Authentication failed` })
);

module.exports = router;

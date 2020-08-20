const express = require("express");
const router = express.Router();
const { OK } = require("http-status-codes");

router.get("/details", (req, res) => {
  res.status(OK).json({ payload: req.user });
});

module.exports = router;

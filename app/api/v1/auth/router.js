const { signinCMS } = require("./controller");
const express = require("express");
const router = express.Router();

router.route("/auth/signin").post(signinCMS);

module.exports = router;

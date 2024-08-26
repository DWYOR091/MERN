const express = require("express");
const { createUsers, createOrganizers } = require("./controller");
const router = express.Router();
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");
router.route("/organizers").post(createOrganizers);

router.route("/users").post(authenticateUser, createUsers);

module.exports = router;

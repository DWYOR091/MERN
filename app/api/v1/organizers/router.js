const express = require("express");
const { createUsers, createOrganizers, getUsers } = require("./controller");
const router = express.Router();
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

router
  .route("/organizers")
  .get(authenticateUser, authorizeRoles("owner"), getUsers)
  .post(authenticateUser, authorizeRoles("owner"), createOrganizers);

router
  .route("/users")
  .post(authenticateUser, authorizeRoles("organizer"), createUsers);

module.exports = router;

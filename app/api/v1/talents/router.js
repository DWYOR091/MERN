const express = require("express");
const router = express.Router();
const { create, index, find, update, destroy } = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

router
  .route("/talents")
  .post(authenticateUser, authorizeRoles("organizer"), create)
  .get(authenticateUser, authorizeRoles("organizer"), index);
router
  .route("/talents/:id")
  .get(authenticateUser, authorizeRoles("organizer"), find)
  .put(authenticateUser, authorizeRoles("organizer"), update)
  .delete(authenticateUser, authorizeRoles("organizer"), destroy);

module.exports = router;

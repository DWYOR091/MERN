const express = require("express");
const router = express.Router();
const { index, create, find, update, destroy, changeStatus } = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

router
  .route("/events")
  .get(authenticateUser, authorizeRoles("organizer"), index)
  .post(authenticateUser, authorizeRoles("organizer"), create);

router
  .route("/events/:id")
  .get(authenticateUser, authorizeRoles("organizer"), find)
  .put(authenticateUser, authorizeRoles("organizer"), update)
  .delete(authenticateUser, authorizeRoles("organizer"), destroy);

router.put('/events/:id/status', authenticateUser, authorizeRoles("organizer"), changeStatus)
module.exports = router;

const express = require("express");
const { create, index, find, update, destroy } = require("./controller");
const router = express.Router();
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

router.get("/tes", (req, res) => {
  res.send("tester");
});
router
  .route("/categories")
  .get(authenticateUser, authorizeRoles("organizer"), index)
  .post(authenticateUser, authorizeRoles("organizer"), create);

router
  .route("/categories/:id")
  .get(authenticateUser, authorizeRoles("organizer"), find)
  .put(authenticateUser, authorizeRoles("organizer"), update)
  .delete(authenticateUser, authorizeRoles("organizer"), destroy);

module.exports = router;

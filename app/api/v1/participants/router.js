const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  activeParticipant,
  getAllLandingPages,
  getDetailLandingPages,
  getDashboard,
} = require("./controller");
const {
  authenticateParticipant,
  authorizeRoles,
} = require("../../../middlewares/auth");

router.post("/auth/signup", signup);
router.post("/auth/signin", signin);
router.put("/activeParticipant", activeParticipant);
router.get("/events", getAllLandingPages);
router.get("/events/:id", getDetailLandingPages);
router.get("/orders", authenticateParticipant, getDashboard);

module.exports = router;

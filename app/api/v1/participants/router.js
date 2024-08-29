const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  activeParticipant,
  getAllLandingPages,
  getDetailLandingPages,
} = require("./controller");

router.post("/auth/signup", signup);
router.post("/auth/signin", signin);
router.put("/activeParticipant", activeParticipant);
router.get("/events", getAllLandingPages);
router.get("/events/:id", getDetailLandingPages);

module.exports = router;

require("dotenv").config();
const express = require("express");
const {
  getAllMeetings,
  getMeetingById,
} = require("../controllers/meetingsControllers");
const { auth } = require("../middlewares/auth");

const meetingsRouter = express.Router();

meetingsRouter.get("/", auth, getAllMeetings);

meetingsRouter.get("/:idMeeting", auth, getMeetingById);

module.exports = meetingsRouter;

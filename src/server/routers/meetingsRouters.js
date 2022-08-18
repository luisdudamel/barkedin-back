require("dotenv").config();
const express = require("express");
const {
  getAllMeetings,
  getMeetingById,
  deleteMeeting,
} = require("../controllers/meetingsControllers");
const { auth } = require("../middlewares/auth");

const meetingsRouter = express.Router();

meetingsRouter.get("/", auth, getAllMeetings);
meetingsRouter.delete("/:idMeeting", auth, deleteMeeting);
meetingsRouter.get("/:idMeeting", auth, getMeetingById);

module.exports = meetingsRouter;

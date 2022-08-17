require("dotenv").config();
const express = require("express");
const getAllMeetings = require("../controllers/meetingsControllers");
const { auth } = require("../middlewares/auth");

const meetingsRouter = express.Router();

meetingsRouter.get("/", auth, getAllMeetings);

module.exports = meetingsRouter;

require("dotenv").config();
const express = require("express");
const getAllMeetings = require("../controllers/meetingsControllers");

const meetingsRouter = express.Router();

meetingsRouter.get("/", getAllMeetings);

module.exports = meetingsRouter;

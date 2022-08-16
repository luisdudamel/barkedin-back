const debug = require("debug")("barkedin:server:controller:meetings");
const chalk = require("chalk");
const Meeting = require("../../database/models/Meeting");

const getAllMeetings = async (req, res, next) => {
  const meetings = await Meeting.find();
  res.status(200).json({ meetings });
  debug(chalk.yellow("A request to get all meetings have been made"));
};

module.exports = getAllMeetings;

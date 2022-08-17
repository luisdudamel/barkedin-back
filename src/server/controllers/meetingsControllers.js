const debug = require("debug")("barkedin:server:controller:meetings");
const chalk = require("chalk");
const Meeting = require("../../database/models/Meeting");
const Dog = require("../../database/models/Dog");

const getAllMeetings = async (req, res, next) => {
  try {
    const meetings = await Meeting.find().populate({
      path: "dog",
      Dog,
    });
    res.status(200).json({ meetings });
    debug(chalk.yellow("A request to get all meetings have been made"));
  } catch (error) {
    error.customMessage = "Error querying all meetings";
    next(error);
  }
};

module.exports = getAllMeetings;

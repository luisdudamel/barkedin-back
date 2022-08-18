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
    debug(chalk.yellow("A request to get all meetings has been made"));
  } catch (error) {
    error.customMessage = "Error querying all meetings";
    next(error);
  }
};

const getMeetingById = async (req, res, next) => {
  try {
    const { idMeeting } = req.params;

    const meetingById = await Meeting.findById({ _id: idMeeting }).populate({
      path: "dog",
      Dog,
    });
    debug(
      chalk.magentaBright("A request to get a meeting by id has been made")
    );
    res.status(200).json({ meeting: meetingById });
  } catch (error) {
    next(error);
  }
};

const deleteMeeting = async (req, res, next) => {
  try {
    const { idMeeting } = req.params;

    await Meeting.findByIdAndDelete(idMeeting);
    debug(
      chalk.greenBright(`A delete request to dogs database has been received`)
    );
    res.status(202).json({ message: "Meeting succesfully deleted" });
  } catch (error) {
    error.customMessage = "Error deleting meeting";
    error.statusCode = 400;
    next(error);
  }
};

module.exports = { getAllMeetings, getMeetingById, deleteMeeting };

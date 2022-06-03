const debug = require("debug")("barkedin:server:controller:dogs");
const chalk = require("chalk");
const Dog = require("../../database/models/Dog");
const User = require("../../database/models/User");

const getFavDogs = async (req, res, next) => {
  try {
    const { username } = req.userId;

    const user = await User.findOne({ username }).populate(
      "favdogs",
      null,
      Dog
    );

    if (user) {
      res.status(200).json({ user });
      debug(chalk.yellow("A request to get fav dogs have been made"));
    } else {
      throw new Error();
    }
  } catch (error) {
    error.customMessage = "Error querying favorite dogs";
    next(error);
  }
};
module.exports = { getFavDogs };

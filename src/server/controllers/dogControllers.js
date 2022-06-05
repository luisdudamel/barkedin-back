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
      res.status(200).json({ favdogs: user.favdogs });
      debug(chalk.yellow("A request to get fav dogs have been made"));
    } else {
      throw new Error();
    }
  } catch (error) {
    error.customMessage = "Error querying favorite dogs";
    next(error);
  }
};

const deleteFavDog = async (req, res, next) => {
  try {
    const { idDog } = req.params;
    await Dog.findByIdAndDelete(idDog);
    res.status(200).json({ message: "Dog succesfully deleted" });

    debug(
      chalk.greenBright(`A delete request to dogs database has been received`)
    );
  } catch (error) {
    error.customMessage = "Error deleting favorite dog";
    error.statusCode = 400;
    next(error);
  }
};

module.exports = { getFavDogs, deleteFavDog };

const debug = require("debug")("barkedin:server:controller:dogs");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
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

const createFavDog = async (req, res, next) => {
  try {
    const { newDog, username } = req.body;

    const { file } = req;
    let newDogParsed;
    if (file) {
      const newFileName = `${Date.now()}-${file.originalname}`;
      fs.rename(
        path.join("uploads", "images", file.filename),
        path.join("uploads", "images", newFileName),
        () => {}
      );
      newDogParsed = JSON.parse(newDog);
      newDogParsed.picture = newFileName;
    }

    const { id: newDogCreated } = await Dog.create(newDogParsed);
    await User.findOneAndUpdate(
      { user: username },
      {
        $push: { favdogs: newDogCreated },
      }
    );

    res.status(201).json({ message: "New dog succesfully created" });

    debug(
      chalk.greenBright(`A create request to dogs database has been received`)
    );
  } catch (error) {
    error.customMessage = "Error creating dog";
    error.statusCode = 400;
    next(error);
  }
};

module.exports = { getFavDogs, deleteFavDog, createFavDog };

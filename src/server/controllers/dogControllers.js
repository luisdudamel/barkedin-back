const debug = require("debug")("barkedin:server:controller:dogs");
const chalk = require("chalk");
const Dog = require("../../database/models/Dog");
const User = require("../../database/models/User");
const dogPage = require("../../utils/dogPage");

const getFavDogs = async (req, res, next) => {
  try {
    const { username } = req.userId;
    const { page } = req.params;
    const { personality } = req.query;

    const dogs = personality
      ? await User.findOne({ username }).populate({
          path: "favdogs",
          Dog,
          match: { personality },
        })
      : await User.findOne({ username }).populate("favdogs", null, Dog);

    const response = dogPage(dogs.favdogs, page, req.hostname);

    if (dogs) {
      res.status(200).json({ favdogs: response });
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
    const { id } = req.userId;

    await Dog.findByIdAndDelete(idDog);
    res.status(200).json({ message: "Dog succesfully deleted" });

    await User.findOneAndUpdate(
      { _id: id },
      {
        $pull: { favdogs: idDog },
      }
    );
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
    const { newDog } = req.body;
    const { id } = req.userId;

    const newDogParsed = JSON.parse(newDog);

    newDogParsed.picture = req.body.picture;
    newDogParsed.picturebackup = req.body.picturebackup;
    newDogParsed.owner = id;

    const { id: newDogCreated } = await Dog.create(newDogParsed);
    await User.findOneAndUpdate(
      { _id: id },
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

const editFavDog = async (req, res, next) => {
  try {
    const { newDog } = req.body;

    const updatedDogParsed = JSON.parse(newDog);

    updatedDogParsed.picturebackup = req.body.picturebackup;
    updatedDogParsed.picture = req.body.picture;

    await Dog.findByIdAndUpdate(
      { _id: updatedDogParsed.id },
      updatedDogParsed,
      {
        new: true,
      }
    );
    res.status(204).json({ message: "Dog succesfully edited" });

    debug(
      chalk.greenBright(`An edit request to dogs database has been received`)
    );
  } catch (error) {
    error.customMessage = "Error updating dog";
    error.statusCode = 400;
    next(error);
  }
};

const getDogById = async (req, res, next) => {
  try {
    const { idDog } = req.params;

    const dogById = await Dog.findById({ _id: idDog });
    res.status(200).json({ dog: dogById });

    debug(
      chalk.greenBright(
        `A get by id request to dogs database has been received`
      )
    );
  } catch (error) {
    error.customMessage = "Error updating dog";
    error.statusCode = 400;
    next(error);
  }
};

const getAllDogs = async (req, res, next) => {
  try {
    const { page } = req.params;
    const { personality } = req.query;

    const dogs = {};
    dogs.favdogs = personality
      ? await Dog.find({ personality })
      : await Dog.find();

    const response = dogPage(dogs.favdogs, page, req.hostname);
    if (dogs) {
      res.status(200).json({ dogs: response });
      debug(chalk.yellow("A request to get all dogs have been made"));
    } else {
      throw new Error();
    }
  } catch (error) {
    error.customMessage = "Error querying all dogs";
    next(error);
  }
};

module.exports = {
  getFavDogs,
  deleteFavDog,
  createFavDog,
  editFavDog,
  getDogById,
  getAllDogs,
};

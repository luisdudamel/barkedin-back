const bcrypt = require("bcrypt");
const debug = require("debug")("barkedin:server:controller:users");
const chalk = require("chalk");
const User = require("../../database/models/User");

const registerUser = async (req, res, next) => {
  const { name, username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      const encryptedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        name,
        username,
        password: encryptedPassword,
      };

      await User.create(newUser);

      res.status(201).json({ user: name });
    } else {
      const userError = new Error();
      userError.customMessage = "User name already exist";
      userError.statusCode = 409;
      next(userError);
      debug(
        chalk.redBright(
          "An attempt to register an user has failed: User existent"
        )
      );
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser };

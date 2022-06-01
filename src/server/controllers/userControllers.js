const bcrypt = require("bcrypt");
const debug = require("debug")("barkedin:server:controller:users");
const chalk = require("chalk");
const User = require("../../database/models/User");

const registerUser = async (req, res, next) => {
  try {
    const { name, username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      const encryptedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        name,
        username,
        password: encryptedPassword,
      };

      await User.create(newUser);

      res.status(201).json({ message: "New user created succesfully" });
    } else {
      const userError = new Error();
      userError.customMessage = "Username already exists";
      userError.statusCode = 409;
      next(userError);
      debug(
        chalk.redBright(
          "An attempt to register an user has failed: User already exists"
        )
      );
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser };

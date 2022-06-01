const bcrypt = require("bcrypt");
const debug = require("debug")("barkedin:server:controller:users");
const chalk = require("chalk");
const jsonwebtoken = require("jsonwebtoken");
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

const loginUser = async (req, res, next) => {
  const username = req.body.username.toString();
  const password = req.body.password.toString();

  const user = await User.findOne({ username });

  if (!user) {
    const error = new Error("Incorrect password");
    error.statusCode = 403;
    error.customMessage = "Username or password is wrong";

    next(error);
  } else {
    const userData = {
      name: user.name,
      username: user.username,
      id: user.id,
    };
    const rightPassword = await bcrypt.compare(password, user.password);

    if (!rightPassword) {
      const error = new Error("Incorrect password");
      error.statusCode = 403;
      error.customMessage = "Username or password is wrong";

      next(error);
    } else {
      const token = jsonwebtoken.sign(userData, process.env.JWT_SECRET);

      res.status(200).json({ token });
    }
  }
};

module.exports = { registerUser, loginUser };

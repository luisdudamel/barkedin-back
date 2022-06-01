require("dotenv").config();
const debug = require("debug")("barkedin:server:middlewares:errors");
const chalk = require("chalk");
const { ValidationError } = require("express-validation");

const notFoundError = (req, res) => {
  debug(chalk.redBright(`A request did not find the endpoint requested`));

  res.status(404).json({ message: "Endpoint not found" });
};

// eslint-disable-next-line no-unused-vars
const generalError = (error, req, res, next) => {
  debug(chalk.red(error.message || error.customMessage));
  const message = error.customMessage ?? "Internal server error";
  const statusCode = error.statusCode ?? 500;

  if (error instanceof ValidationError) {
    res.status(400).json({ message: "Bad request" });
    debug(chalk.bgRedBright(error.message));
  } else {
    res.status(statusCode).json({ message });
  }
};

module.exports = {
  notFoundError,
  generalError,
};

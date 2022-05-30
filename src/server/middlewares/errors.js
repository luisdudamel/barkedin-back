require("dotenv").config();
const debug = require("debug")("barkedin:server:middlewares:errors");
const chalk = require("chalk");

const notFoundError = (req, res) => {
  debug(chalk.redBright(`A request did not find the endpoint requested`));

  res.status(404).json({ msg: "Endpoint not found" });
};

// eslint-disable-next-line no-unused-vars
const generalError = (error, req, res, next) => {
  debug(chalk.red(error.message || error.customMessage));
  const message = error.customMessage ?? "General pete";
  const statusCode = error.statusCode ?? 500;

  debug(chalk.bgRedBright(error.message));

  res.status(statusCode).json({ error: true, message });
};

module.exports = {
  notFoundError,
  generalError,
};

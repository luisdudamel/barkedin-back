require("dotenv").config();
const debug = require("debug")("barkedin:root");

const chalk = require("chalk");
const connectDB = require("./database/index");
const initializeServer = require("./server/initializeServer");

const port = process.env.PORT ?? 4000;
const connectionString = process.env.MONGO_CONNECTION;

(async () => {
  try {
    await connectDB(connectionString);
    await initializeServer(port);
  } catch (error) {
    debug(chalk.red("Exiting with errors"));
    process.exit(1);
  }
})();

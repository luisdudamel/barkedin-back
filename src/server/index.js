const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const { notFoundError, generalError } = require("./middlewares/errors");
const corsOptions = require("../utils/corsOptions");
const usersRouter = require("./routers/userRouters");

const app = express();

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());

app.use("/users", usersRouter);

app.use(notFoundError);
app.use(generalError);

module.exports = app;

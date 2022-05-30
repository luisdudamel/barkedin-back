const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const { notFoundError } = require("./middlewares/errors");
const corsOptions = require("../utils/corsOptions");

const app = express();

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());

app.use(notFoundError);

module.exports = app;

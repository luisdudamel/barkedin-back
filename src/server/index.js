const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const { notFoundError, generalError } = require("./middlewares/errors");
const corsOptions = require("../utils/corsOptions");
const usersRouter = require("./routers/userRouters");
const dogsRouter = require("./routers/dogsRouters");
const meetingsRouter = require("./routers/meetingsRouters");

const app = express();

app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/users", usersRouter);
app.use("/dogs", dogsRouter);
app.use("/meetings", meetingsRouter);
app.use(notFoundError);
app.use(generalError);

module.exports = { app };

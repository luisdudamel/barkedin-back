require("dotenv").config();
const express = require("express");
const { getFavDogs } = require("../controllers/dogControllers");
const { auth } = require("../middlewares/auth");

const dogsRouter = express.Router();

dogsRouter.get("/favdogs", auth, getFavDogs);

module.exports = dogsRouter;

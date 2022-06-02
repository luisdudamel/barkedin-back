require("dotenv").config();
const express = require("express");
const { getFavDogs } = require("../controllers/dogControllers");

const dogsRouter = express.Router();

dogsRouter.get("/favdogs", getFavDogs);

module.exports = dogsRouter;

require("dotenv").config();
const express = require("express");
const {
  getFavDogs,
  deleteFavDog,
  createFavDog,
} = require("../controllers/dogControllers");
const { auth } = require("../middlewares/auth");

const dogsRouter = express.Router();

dogsRouter.get("/favdogs", auth, getFavDogs);
dogsRouter.delete("/:idDog", auth, deleteFavDog);
dogsRouter.post("/create", auth, createFavDog);

module.exports = dogsRouter;

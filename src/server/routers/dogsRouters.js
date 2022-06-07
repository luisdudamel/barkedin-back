require("dotenv").config();
const path = require("path");
const express = require("express");
const multer = require("multer");
const {
  getFavDogs,
  deleteFavDog,
  createFavDog,
} = require("../controllers/dogControllers");
const { auth } = require("../middlewares/auth");

const upload = multer({ dest: path.join("uploads", "images") });

const dogsRouter = express.Router();

dogsRouter.get("/favdogs", auth, getFavDogs);
dogsRouter.delete("/:idDog", auth, deleteFavDog);
dogsRouter.post("/create", auth, upload.single("picture"), createFavDog);

module.exports = dogsRouter;

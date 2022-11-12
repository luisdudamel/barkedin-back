require("dotenv").config();
const path = require("path");
const express = require("express");
const multer = require("multer");
const {
  getFavDogs,
  deleteFavDog,
  createFavDog,
  editFavDog,
  getDogById,
  getAllDogs,
} = require("../controllers/dogControllers");
const { auth } = require("../middlewares/auth");
const supabaseUpload = require("../middlewares/supabase");

const upload = multer({
  dest: path.join("uploads", "images"),
  limits: { fileSize: 3000000 },
});

const dogsRouter = express.Router();

dogsRouter.get("/all/:page", auth, getAllDogs);
dogsRouter.get("/:idDog", auth, getDogById);
dogsRouter.get("/favdogs/:page", auth, getFavDogs);
dogsRouter.delete("/:idDog", auth, deleteFavDog);
dogsRouter.post(
  "/create",
  auth,
  upload.single("picture"),
  supabaseUpload,
  createFavDog
);
dogsRouter.put("/edit/:idDog", auth, upload.single("picture"), editFavDog);

module.exports = dogsRouter;

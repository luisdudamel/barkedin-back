require("dotenv").config();
const express = require("express");
const { validate } = require("express-validation");
const {
  credentialsRegisterSchema,
} = require("../../schemas/userCredentialsSchema");
const { registerUser } = require("../controllers/userControllers");

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  validate(credentialsRegisterSchema),
  registerUser
);

module.exports = usersRouter;

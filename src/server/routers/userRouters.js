require("dotenv").config();
const express = require("express");
const { validate } = require("express-validation");
const {
  credentialsRegisterSchema,
  credentialsLoginSchema,
} = require("../../schemas/userCredentialsSchema");
const { registerUser, loginUser } = require("../controllers/userControllers");

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  validate(credentialsRegisterSchema),
  registerUser
);
usersRouter.post("/login", validate(credentialsLoginSchema), loginUser);
module.exports = usersRouter;

const { Schema, model, SchemaTypes } = require("mongoose");

const DogSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  toy: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  personality: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
  breed: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  picturebackup: {
    type: String,
    required: true,
  },
});

const Dog = model("Dog", DogSchema, "dogs");

module.exports = Dog;

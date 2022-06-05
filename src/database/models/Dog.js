const { Schema, model } = require("mongoose");

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
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
});

const Dog = model("Dog", DogSchema, "dogs");

module.exports = Dog;

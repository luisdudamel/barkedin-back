const { Schema, model, SchemaTypes } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  favdogs: [{ type: SchemaTypes.ObjectId, ref: "Dog" }],
});

const User = model("User", UserSchema, "users");

module.exports = User;

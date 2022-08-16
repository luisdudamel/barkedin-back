const { Schema, model, SchemaTypes } = require("mongoose");

const MeetingSchema = new Schema({
  creator: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  dog: {
    type: SchemaTypes.ObjectId,
    ref: "Dog",
    required: true,
  },
  day: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const Meeting = model("Meeting", MeetingSchema, "meetings");

module.exports = Meeting;

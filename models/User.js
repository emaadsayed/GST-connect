const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    branch: {
      type: String,
      enum: ["CE", "EXTC", "IT", "ME", "PPT", "ECE"],
      required: true,
    },
    year: {
      type: String,
      enum: ["FE", "SE", "TE", "BE"],
      required: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      index: { unique: true },
      lowercase: true,
      trim: true,
    },
    contact: {
      type: String,
      minlength: 10,
      maxlength: 10,
    },
    instagram: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    facebook: {
      type: String,
    },
    bio: {
      type: String,
    },
    skills: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", user);

const mongoose = require("mongoose");

const project = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    stack: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Completed"],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", project);

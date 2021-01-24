const mongoose = require("mongoose");

const book = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    publication: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", book);

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
    coverImage: {
      type: Buffer,
      required: true
  },
    coverImageType: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

book.virtual('coverImagePath').get(function() {
  if (this.coverImage != null && this.coverImageType != null) {
    return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
  }
})

module.exports = mongoose.model("Book", book);

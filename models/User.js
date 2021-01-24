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
      default: null
    },
    instagram: {
      type: String,
      default: null
    },
    linkedin: {
      type: String,
      default: null
    },
    facebook: {
      type: String,
      default: null
    },
    bio: {
      type: String,
      default: null
    },
    skills: {
      type: String,
      default: null
    },
    type: {
      type: String,
      enum: ["Private", "Public"],
      default: "Private"
  },
  coverImage: {
    type: Buffer,
},
  coverImageType: {
    type: String,
  }
},
  { timestamps: true }
);

user.virtual('coverImagePath').get(function() {
  if (this.coverImage != null && this.coverImageType != null) {
    return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
  }
})
 
module.exports = mongoose.model("User", user);

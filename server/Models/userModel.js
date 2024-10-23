const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    imageurl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    userDatas: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const userModel = mongoose.model("User", userSchema);
const blogModel = mongoose.model("UserBlog", blogSchema);
module.exports = {
  userModel,
  blogModel,
};

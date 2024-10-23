const { userModel, blogModel } = require("../Models/userModel");
const validator = require("validator");
const port = process.env.PORT || 4444;
const bcrypt = require("bcrypt");
const multer = require("multer");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET_KEY, { expiresIn: "1h" });
};

//user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log(`name:${name},email:${email},password:${password}`);
    let user = await userModel.findOne({ email });
    if (user) return res.status(400).json("the email already exists");
    if (!name || !email || !password)
      return res.status(400).json("all fields are required");
    if (!validator.isEmail(email))
      return res.status(400).json("email is not correct");
    user = new userModel({ name, password, email });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = createToken(user._id);
    res.json({
      token,
      user,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

//userlogin
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) return res.status(400).json("email or Passwor is not correct");

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json("email or password is not correct");
    }
    res.json({ user });
  } catch (error) {
    res.json(error);
  }
};

//get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.json(error);
  }
};
//get one user
const getOneUser = async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  try {
    let user = await userModel.findById(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({
      "error from getting one user": error,
    });
  }
};

//create a blog
const createBlog = async (req, res) => {
  try {
    const { title, body, userDatas } = req.body;
    if (!title || !body)
      return res.status(400).json("Both Title and Body are required");
    let user = new blogModel({ title, body, userDatas });
    await user.save();
    res.json(user);
  } catch (error) {
    console.log("erron in createBlog controller", error);
  }
};
//get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const users = await blogModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.json(error);
  }
};
const deleteBlog = async (req, res) => {
  try {
    const user = await blogModel.findOneAndDelete({ _id: req.body.id });
    res.status(200).json(user);
  } catch (error) {
    res.json(error);
  }
};
//upload an image
// const storage = multer.diskStorage({
//   destination: "./upload/images",
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });
// export const upload = multer({ storage: storage });
// app.use("/images", express.static("./upload/images"));
// //
// const uploadImage = (req, res) => {
//   res.json({
//     success: 1,
//     image_url: `http://localhost:${port}/images/${req.file.filename}`,
//   });
// };
module.exports = {
  registerUser,
  userLogin,
  getAllUsers,
  getOneUser,
  createBlog,
  getAllBlogs,
  deleteBlog,
};

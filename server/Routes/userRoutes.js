const express = require("express");
const {
  registerUser,
  userLogin,
  getAllUsers,
  getOneUser,
  createBlog,
  getAllBlogs,
  deleteBlog,
  // uploadImage,
  // upload,
} = require("../Controllers/userControllers");
const router = express.Router();
router.post("/register", registerUser);
router.post("/login", userLogin);
router.post("/createblog", createBlog);
router.post("/delete", deleteBlog);
router.get("/getoneuser/:userId", getOneUser);
router.get("/allusers", getAllUsers);
router.get("/allblogs", getAllBlogs);

// router.post("/upload", upload.single("profileImage"), uploadImage);
module.exports = router;

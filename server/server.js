const express = require("express");
const cors = require("cors");
require("dotenv").config();
const userRouter = require("./Routes/userRoutes");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 4444;
const uri = process.env.URI;
app.use(express.json());
app.use(cors());
app.use(userRouter);
mongoose
  .connect(uri)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(`connection to db failed : ${err.message}`));
app.listen(port, (req, res) => {
  console.log(`connected to port ${port}`);
});

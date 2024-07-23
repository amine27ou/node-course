require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const url = process.env.CONNECTION_STR;
const port = 5000;
const coursesRouter = require("./routes/courses.route");
const usersRouter = require("./routes/users.route");
const path = require('path')

app.use("/uploads",express.static(path.join(__dirname,'uploads')))
app.use(express.json());
app.use("/api/courses/", coursesRouter);
app.use("/api/users/", usersRouter);

mongoose.connect(url).then(() => {
  console.log("connected successfully!");
});

app.all("*", (req, res, next) => {
  res.json("NOT FOUND");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

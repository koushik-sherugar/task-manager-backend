const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

// routes
const user = require("./routes/user.route");

const task = require("./routes/task.route");

// // api
app.use("/user", user);
app.use("/task", task);

// Connect to mongodb
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
});

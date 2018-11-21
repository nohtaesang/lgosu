const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const User = require("./models/user");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;
const router = require("./routes")(app, User);
const server = app.listen(port, () => {
  console.log("Express server has started on port " + port);
});

const db = mongoose.connection;
db.on("error", console.error);
db.once("opne", () => {
  console.log("Connected to mongod server");
});
mongoose.connect("mongodb://localhost/lgosu");

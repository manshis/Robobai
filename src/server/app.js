var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
//var cors = require("cors");
var config = require("./config");

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(config.connectionString + config.databaseName);
const db = mongoose.connection;
db.once("open", function() {
  console.log("DB connected!");
});
var indexRouter = require("./routes/product");

var app = express();
//app.use(cors());
app.use(express.static(path.join(__dirname, "../../dist/Robobai")));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api", indexRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../dist/Robobai/index.html"));
});

module.exports = app;

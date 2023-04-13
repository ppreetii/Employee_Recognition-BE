const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const rewardRoutes = require('./src/routes/v1/reward');
const API = require("./src/constants/api")

const app = express();

process
  .on("unhandledRejection", (reason) => {
    console.error("Unhandled Rejection at Promise", reason);
  })
  .on("uncaughtException", (err) => {
    console.error("Uncaught Exception thrown", err);
    process.exit(1);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(API.BASE_URL + API.REWARD, rewardRoutes)
app.use("*", (req, res) => res.status(404).json("Page not found"));

app.use((error, req, res, next) => {
  console.log(error)
  res.status(500).json({
    messsage: "Error",
    reason: error.message,
  });
});

module.exports = app;

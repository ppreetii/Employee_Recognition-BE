const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cron = require("node-cron");

const rewardRoutes = require("./src/routes/v1/reward");
const API = require("./src/constants/api");
const rewardServices = require("./src/services/reward");
const COMMON = require("./src/constants/common");

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
app.use(API.BASE_URL + API.REWARD, rewardRoutes);
app.use("*", (req, res) => res.status(404).json("Page not found"));

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).json({
    messsage: "Error",
    reason: error.message,
  });
});

// Schedule Employee of The Day cron job to run every day at 7 PM, except on weekends and holidays
cron.schedule("0 19 * * 1-5", async () => {
  try {
    let date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    const empDay = await rewardServices.getEmployees(
      COMMON.EMP_OF_DAY,
      `${year}-${month}-${day}`
    );
  } catch (error) {
    console.error(error);
  }
});

// Schedule Employee of The Week cron job to run every Monday
cron.schedule("0 0 * * 1", async () => {
  try {
    let date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    const empWeeek = await rewardServices.getEmployees(
      COMMON.EMP_OF_WEEK,
      `${year}-${month}-${day}`
    );
  } catch (error) {
    console.error(error);
  }
});

// Schedule Employee of The Month cron job to run on the first day of each month
cron.schedule("0 0 1 * *", async () => {
  try {
    let date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    const empMonth = await rewardServices.getEmployees(
      COMMON.EMP_OF_MONTH,
      `${year}-${month}-${day}`
    );
  } catch (error) {
    console.error(error);
  }
});

module.exports = app;

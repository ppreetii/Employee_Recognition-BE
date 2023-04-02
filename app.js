const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const helmet = require("helmet");

const app = express();

const handleUnhandledOperation = () => {
    process
      .on('unhandledRejection', (reason) => {
        console.error('Unhandled Rejection at Promise', reason);
      })
      .on('uncaughtException', (err) => {
        console.error('Uncaught Exception thrown', err);
        process.exit(1);
      });
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());



app.use('*', (req, res) => res.status(404).json('Page not found'));

//this is a special middleware by express, where we can directly catch error throw next(error)
app.use((error, req, res, next) => {
  res.status(500).json( {
    messsage: "Error",
    reason: error.message
  });
});

module.exports = app;
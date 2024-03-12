const env = require("./config");

module.exports = {
  development: {
    username: env.userName,
    password: env.password,
    database: env.dbName + "_dev",
    host: env.hostname,
    dialect: "mysql",
    seederStorage: "sequelize",
    logging: false,
    dialectModule: require('mysql2')
  },
  test: {
    username: env.userName,
    password: env.password,
    database: env.dbName + "_test",
    host: env.hostname,
    dialect: "mysql",
    seederStorage: "sequelize",
    logging: false,
    dialectModule: require('mysql2')
  },
  production: {
    username: env.userName,
    password: env.password,
    database: env.dbName + "_prod",
    host: env.hostname,
    dialect: "mysql",
    seederStorage: "sequelize",
    logging: false,
    dialectModule: require('mysql2')
  },
};

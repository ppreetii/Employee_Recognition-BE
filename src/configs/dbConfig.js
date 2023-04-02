const env = require("./config");

module.exports = {
  development: {
    username: env.userName,
    password: env.password,
    database: env.dbName + "_dev",
    host: env.hostname,
    dialect: "mysql",
    seederStorage: "sequelize",
    logging: false
  },
  test: {
    username: env.userName,
    password: env.password,
    database: env.dbName + "_test",
    host: env.hostname,
    dialect: "mysql",
    seederStorage: "sequelize",
    logging: false
  },
  production: {
    username: env.userName,
    password: env.password,
    database: env.dbName + "_prod",
    host: env.hostname,
    dialect: "mysql",
    seederStorage: "sequelize",
    logging: false
  },
};

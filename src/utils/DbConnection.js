const Sequelize = require("sequelize");
const config = require("../configs/dbConfig")[process.env.NODE_ENV];

let dbInstance;

class DbConnection {
  constructor() {
    if (dbInstance) {
      return dbInstance;
    } else {
      return this.createDbInstance();
    }
  }

  createDbInstance() {
    dbInstance = new Sequelize(
      config.database,
      config.username,
      config.password,
      dialectModule: require('mysql2'),
      config
    );
    return dbInstance;
  }
}

module.exports = new DbConnection();

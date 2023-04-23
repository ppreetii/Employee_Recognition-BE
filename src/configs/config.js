const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT,
  userName: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DATABASE_NAME,
  hostname: process.env.DB_HOSTNAME,
  environment: process.env.NODE_ENV,
  courierApiKey: process.env.COURIER_AUTH_TOKEN,
  courierNotificationId: process.env.COURIER_NOTIIFICATION_ID
};

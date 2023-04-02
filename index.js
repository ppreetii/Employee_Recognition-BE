const db = require("./src/models/index");
const app = require("./app");
const config = require("./src/configs/config");

const initializeDbAndStartServer = async () => {
  await db.sequelize.sync();
  console.info(`Database connected!`);
  app.listen(config.port, () => {
    console.info(`Server listening on port ${config.port}`);
  });
};

initializeDbAndStartServer();

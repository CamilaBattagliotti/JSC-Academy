import { Sequelize, DataTypes, Model } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, PORT } = process.env;

// Local.
// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${PORT || 5432}/${DB_NAME}`
// );

// Deploy(desde postman). URL publica de nuestra db.
const sequelize = new Sequelize(
  `postgresql://postgres:qetXZBGABAZCezKIFcLdyTHxuklgbQdt@autorack.proxy.rlwy.net:46871/railway`
);

async function authenticate() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

async function checkIfTableExists() {
  const queryInterface = sequelize.getQueryInterface();
  const tables = await queryInterface.showAllTables();

  if (tables.includes("Auths")) {
    console.log('La tabla "Auths" existe.', tables);
  } else {
    console.log('La tabla "Auths" no existe.');
  }
}

(async () => {
  //sequelize.sync({ alter: true });
  await authenticate();
  await checkIfTableExists();
})();
export default sequelize;
export { DataTypes, Model };

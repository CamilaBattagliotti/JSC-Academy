import { Sequelize, DataTypes, Model } from "sequelize";

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, PORT } = process.env;

const sequelize = new Sequelize(
  `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${PORT || 5432}/${DB_NAME}`
);

async function authenticate() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
authenticate();
export default sequelize;
export { DataTypes, Model };

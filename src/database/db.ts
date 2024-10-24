import { Sequelize, DataTypes, Model } from "sequelize";

const sequelize = new Sequelize(); //url de nuestra db
//const sequelize = new Sequelize("process.env.DB_URI");

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

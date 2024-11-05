import sequelize, { DataTypes } from "../database/db";
import User from "./users";

const Blacklist = sequelize.define("Blacklist", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "El token es requerido" },
    },
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: User, key: "id" },
    // onDelete: "CASCADE",
    validate: {
      notEmpty: { msg: "El id de usuario es requerido" },
    },
  },
});

export default Blacklist;

import sequelize, { DataTypes } from "../database/db";
import User from "./users";

const Auth = sequelize.define("Auth", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "La contraseña no puede estar vacía" },
    },
  },

  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: User, key: "id" },
    onDelete: "CASCADE",
    validate: {
      notEmpty: { msg: "El id de ususario es requerido" },
    },
  },
});
export default Auth;

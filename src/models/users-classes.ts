import sequelize from "../database/db";
import { DataTypes, Model } from "../database/db";
import User from "./users";
import Classe from "./classes";

const UserClasse = sequelize.define(
  "UserClasse",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID, //no es uuid?
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    classeId: {
      type: DataTypes.UUID, ////no es uuid?
      allowNull: false,
      references: {
        model: Classe,
        key: "id",
      },
    },
    enrollmentDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Fecha de inscripción
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "active", // Estado de la inscripción (e.g., activo, cancelado)
    },
  },
  { timestamps: false }
);
export default UserClasse;

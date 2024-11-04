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
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
    },
    classeId: {
      type: DataTypes.UUID, ////no es uuid?
      allowNull: true,
      references: {
        model: Classe,
        key: "id",
      },
    },
  },
  { timestamps: false }
);

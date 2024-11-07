import sequelize from "../database/db";
import { DataTypes } from "../database/db";
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
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    classeId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Classe,
        key: "id",
      },
    },
    enrollmentDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Active",
    },
  },
  { timestamps: false }
);

export default UserClasse;

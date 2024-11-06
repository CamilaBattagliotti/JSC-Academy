import User from "./users";
import Auth from "./auth";
import sequelize from "../database/db";
import Classe from "./classes";
import UserClasse from "./users-classes";

User.hasOne(Auth, {
  foreignKey: "userId",
  onDelete: "CASCADE", // Elimina el registro en Auth cuando se elimina el usuario
});

Auth.belongsTo(User, {
  foreignKey: "userId",
});

// Relación muchos a muchos entre User y Classe
User.belongsToMany(Classe, {
  through: UserClasse,
  onDelete: "CASCADE",
  foreignKey: "userId",
  otherKey: "classeId",
});

Classe.belongsToMany(User, {
  through: UserClasse,
  onDelete: "CASCADE",
  foreignKey: "classeId",
  otherKey: "userId",
});

sequelize.sync({ alter: true });

export { User, Auth, Classe, UserClasse };

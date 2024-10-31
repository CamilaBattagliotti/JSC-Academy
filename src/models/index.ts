import User from "./users";
import Auth from "./auth";
import sequelize from "../database/db";
import Classe from "./classes";

User.hasOne(Auth, {
  foreignKey: "userId",
  onDelete: "CASCADE", // Elimina el registro en Auth cuando se elimina el usuario
});

Auth.belongsTo(User, {
  foreignKey: "userId",
});

// Relación muchos a muchos entre User y Classe
User.belongsToMany(Classe, {
  through: "UserClasses", // Nombre de la tabla intermedia
  foreignKey: "userId",
});

Classe.belongsToMany(User, {
  through: "UserClasses", // Nombre de la tabla intermedia
  foreignKey: "classeId",
});

sequelize.sync({ force: true });

export { User, Auth, Classe };

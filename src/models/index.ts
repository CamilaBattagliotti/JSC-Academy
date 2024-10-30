import User from "./users";
import Auth from "./auth";
import sequelize from "../database/db";
User.hasOne(Auth, {
  foreignKey: "userId",
  onDelete: "CASCADE", // Configuración para eliminación en cascada
});
Auth.belongsTo(User, {
  foreignKey: "userId",
});
sequelize.sync();

export { User, Auth };

import User from "./users";
import Auth from "./auth";
import sequelize from "../database/db";
User.hasOne(Auth);
Auth.belongsTo(User);
sequelize.sync();

export { User, Auth };

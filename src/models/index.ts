import User from "./users-model";
import Auth from "./auth";

User.hasOne(Auth);
Auth.belongsTo(User);

export { User, Auth };

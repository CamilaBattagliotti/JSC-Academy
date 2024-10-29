//service logica de negocios..
import User from "../models/users-model";

class UserService {
  static async getAll() {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      throw error;
    }
  }
  static async create(data) {
    try {
      console.log("soy el servicio", data);

      const { username, fullname, email, birthdate, nationality } = data;
      console.log("antes de entrar a create de sequelize: ");

      const user = await User.create({
        username,
        fullname,
        email,
        birthdate,
        nationality,
      });
      console.log("soy user", user);

      return user;
    } catch (error) {
      throw error;
    }
  }
  static async getOne(id) {
    try {
      const user = await User.findOne(id);
      return user;
    } catch (error) {
      throw error;
    }
  }
  static async delete(id) {
    try {
      const user = await User.destroy(id);
      return user;
    } catch (error) {
      throw error;
    }
  }
  static async update(id, data) {
    try {
      const user = await User.update(id, data);
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;

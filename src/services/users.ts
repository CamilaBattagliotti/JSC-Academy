//service logica de negocios..
import User from "../models/users";

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
      const { username, fullname, email, birthdate, nationality } = data;

      const user = await User.create({
        username,
        fullname,
        email,
        birthdate,
        nationality,
      });

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
  static async delete(userId: string) {
    try {
      const user = await User.destroy({ where: { id: userId } });
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

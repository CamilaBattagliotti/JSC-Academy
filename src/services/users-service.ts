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
}

export default UserService;

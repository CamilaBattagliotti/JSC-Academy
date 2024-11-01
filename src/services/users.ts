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
  static async getById(id) {
    //ok
    try {
      const user = await User.findByPk(id);
      if (!user) {
        const error = new Error("Usuario no encontrado");
        error["statusCode"] = 404;
        throw error;
      }
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
      const [filasActualizadas] = await User.update(data, {
        where: { id: id },
      });

      if (filasActualizadas == 0) {
        const error = new Error("Error al actualizar el usuario");
        error["statusCode"] = 404;
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  static async getByEmail(email) {
    try {
      const user = await User.findOne({ where: { email: email } }); //???
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;

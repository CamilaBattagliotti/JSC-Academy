//service logica de negocios..
import { Classe, UserClasse } from "../models";
import User from "../models/users";
import createFilters from "../utils/createFilters";
import { validateUser, validateUserUpdate } from "../schemas/users";

class UserService {
  static async getAll(data) {
    try {
      const filters = createFilters(data);

      const users = await User.findAndCountAll({
        ...filters,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: {
          model: Classe,
          attributes: ["name"], // Solo incluimos el nombre de la clase
          through: {
            attributes: [], // No incluimos otros atributos de la tabla intermedia
            where: { status: "Active" }, // Filtramos solo las clases con status "active"
          },
        },
      });
      return users;
    } catch (error) {
      throw error;
    }
  }
  static async create(data) {
    try {
      const result = validateUser(data);

      if (!result.success) {
        const errorMessages = result.error.errors
          .map((err) => err.message)
          .join(". ");
        const error: any = new Error(
          `Los datos ingresados son inválidos: ${errorMessages}`
        );
        error["statusCode"] = 400;

        throw error;
      }
      const { username, fullname, email, birthdate, nationality } = result.data;

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

  static async getById(id: string) {
    try {
      const user = await User.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },

        include: {
          model: Classe,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          through: { attributes: ["status", "enrollmentDate"] },
        },
      });

      if (!user) {
        throw new Error("Usuario no encontrado");
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
      const result = validateUserUpdate(data);

      if (!result.success) {
        const errorMessages = result.error.errors
          .map((err) => err.message)
          .join(". ");
        const error: any = new Error(
          `Los datos ingresados son inválidos: ${errorMessages}`
        );
        error["statusCode"] = 400;

        throw error;
      }
      const [usersCount] = await User.update(result.data, {
        where: { id: id },
      });

      if (usersCount == 0) {
        const error = new Error("Error al actualizar el usuario");
        error["statusCode"] = 404;
        throw error;
      }
      return { "Numero de registros modificados: ": usersCount };
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

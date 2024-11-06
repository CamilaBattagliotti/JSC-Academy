import { UserClasse } from "../models";
import User from "../models/users";
import Classe from "../models/classes";
import createFilters from "../utils/createFilters";

class ClassesService {
  static async getAll(data) {
    try {
      const filters = createFilters(data);

      const classes = await Classe.findAndCountAll(filters);
      return classes;
    } catch (error) {
      throw error;
    }
  }
  static async create(data) {
    try {
      const { name, startDate, endDate } = data;

      const classe = await Classe.create({
        name,
        startDate,
        endDate,
      });

      return classe;
    } catch (error) {
      throw error;
    }
  }
  static async getById(id) {
    try {
      const classe = await Classe.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },

        include: {
          model: User,
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "email",
              "birthdate",
              "id",
              "nationality",
            ],
          },
        },
      });
      return classe;
    } catch (error) {
      throw error;
    }
  }
  static async delete(id) {
    try {
      const classe = await Classe.findByPk(id);
      if (!classe) {
        throw new Error("Clase no encontrada");
      }

      await classe.destroy();
      return { message: "Clase eliminada correctamente" };
    } catch (error) {
      throw error;
    }
  }
  static async update(id, data) {
    try {
      const classe = await Classe.update(data, {
        where: { id: id },
      });
      return classe;
    } catch (error) {
      throw error;
    }
  }

  static async enroll(classeId: string, userId: string) {
    const date = new Date();
    try {
      const signUp = await UserClasse.create({
        classeId,
        userId,
        enrollmentDate: date,
        status: "Active",
      });
      return signUp;
    } catch (error) {
      throw error;
    }
  }

  static async unroll(classeId: string, userId: string) {
    const date = new Date();
    try {
      const userClass = await UserClasse.findOne({
        where: { classeId: classeId, userId: userId, status: "Active" },
      });

      if (!userClass) {
        const error = new Error(
          "No se encontró la inscripción activa para cancelar"
        );
        error["statusCode"] = 404;
        throw error;
      }

      const userUnrolled = {
        enrollmentDate: date,
        status: "Cancelled",
      };

      const [updatedCount] = await UserClasse.update(userUnrolled, {
        where: { classeId: classeId, userId: userId, status: "Active" },
      });

      if (updatedCount == 0) {
        throw new Error("No se pudo actualizar el estado, verifica los datos");
      }

      return { message: "Inscripción cancelada correctamente", updatedCount };
    } catch (error) {
      throw error;
    }
  }
}

export default ClassesService;

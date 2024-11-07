import { UserClasse } from "../models";
import User from "../models/users";
import Classe from "../models/classes";
import createFilters from "../utils/createFilters";
import { validateClass, validateUpdatedClass } from "../schemas/classes";
import Logger from "../lib/winston";

class ClassesService {
  static async getAll(data) {
    try {
      const filters = createFilters(data);

      const classes = await Classe.findAndCountAll({
        ...filters,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      return classes;
    } catch (error) {
      throw error;
    }
  }

  static async create(data) {
    try {
      const result = validateClass(data);

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

      const { name, startDate, endDate } = result.data;

      const classe = await Classe.create({
        name,
        startDate,
        endDate,
      });
      Logger.info(`Clase creada ${name}`);

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

      if (!classe) {
        const error: any = new Error("Clase no encontrada");
        error["statusCode"] = 404;
        throw error;
      }

      return classe;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const classe = await Classe.findByPk(id);

      if (!classe) {
        const error: any = new Error("Clase no encontrada");
        error["statusCode"] = 404;
        throw error;
      }

      await classe.destroy();
      Logger.info("Clase eliminada");

      return { message: "Clase eliminada correctamente" };
    } catch (error) {
      throw error;
    }
  }

  static async update(id, data) {
    try {
      const result = validateUpdatedClass(data);

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

      const [classCount, classes] = await Classe.update(result.data, {
        where: { id: id },
        returning: true,
      });

      if (classCount === 0) {
        const error = new Error("No se encontró la clase para actualizar");
        error["statusCode"] = 404;
        throw error;
      }

      return { "Clase modificada: ": classes };
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
      Logger.info("Inscripcion exitosa");

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
        const error = new Error(
          "No se pudo actualizar el estado, verifica los datos"
        );
        error["statusCode"] = 404;
        throw error;
      }
      Logger.info("Desvinculacion exitosa");

      return { message: "Inscripción cancelada correctamente", updatedCount };
    } catch (error) {
      throw error;
    }
  }
}

export default ClassesService;

import { UserClasse } from "../models";
import Classe from "../models/classes";

class ClassesService {
  static async getAll() {
    try {
      const classes = await Classe.findAll();
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
      const classe = await Classe.findByPk(id);
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

  static async enroll(classId, userId) {
    console.log("entre al servicio", classId, userId);
    const date = new Date();
    try {
      const signUp = await UserClasse.create({
        classId,
        userId,
        enrollmentDate: date,
        status: "Active",
      });
      return signUp;
    } catch (error) {
      throw error;
    }
  }
}

export default ClassesService;

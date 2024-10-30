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
  static async getOne(id) {
    try {
      const classe = await Classe.findOne(id);
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
      const classe = await Classe.update(id, data);
      return classe;
    } catch (error) {
      throw error;
    }
  }
}

export default ClassesService;

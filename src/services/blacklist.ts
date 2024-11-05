import Blacklist from "../models/blacklist";

class BlacklistService {
  static async addToken(token: string, userId: string) {
    try {
      const existingToken = await Blacklist.findOne({ where: { token } });

      if (existingToken) {
        throw new Error("El token ya está en la lista negra");
      }

      await Blacklist.create({
        token,
        userId,
      });
    } catch (error) {
      throw new Error(
        "Error al añadir el token a la lista negra: " + error.message
      );
    }
  }

  // Verificar si un token está en la blacklist
  static async isTokenBlacklisted(token: string) {
    try {
      // Buscar si el token ya está en la lista negra
      const blacklistEntry = await Blacklist.findOne({ where: { token } });
      return blacklistEntry !== null; // Devuelve true si el token está en la lista negra
    } catch (error) {
      throw new Error(
        "Error al verificar el token en la lista negra: " + error.message
      );
    }
  }
}

export default BlacklistService;

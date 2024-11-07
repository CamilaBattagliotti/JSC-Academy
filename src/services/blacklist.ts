import Blacklist from "../models/blacklist";

class BlacklistService {
  static async addToken(token: string, userId: string) {
    try {
      await Blacklist.create({
        token,
        userId,
      });
    } catch (error) {
      throw new Error("Error al añadir el token a la lista negra");
    }
  }

  static async isTokenBlacklisted(token: string) {
    try {
      const blacklistEntry = await Blacklist.findOne({ where: { token } });

      return blacklistEntry !== null;
    } catch (error) {
      throw new Error(
        "Error al verificar el token en la lista negra: " + error.message
      );
    }
  }
}

export default BlacklistService;

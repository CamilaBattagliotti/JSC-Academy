import { NextFunction, Request, Response } from "express";
import BlacklistService from "../services/blacklist";

class BlacklistController {
  // Endpoint para añadir un token a la lista negra (usado en el logout)
  static async addTokenToBlacklist(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = req.headers.authorization?.split(" ")[1]; // Obtener el token desde el header Authorization

      if (!token) {
        return res.status(400).json({ message: "Token requerido" });
      }

      // Añadir el token a la lista negra
      await BlacklistService.addToken(token);

      res.status(200).json({ message: "Token añadido a la lista negra" });
    } catch (error) {
      next(error);
    }
  }

  // Endpoint para verificar si un token está en la lista negra
  static async isTokenBlacklisted(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(400).json({ message: "Token requerido" });
      }

      const isBlacklisted = await BlacklistService.isTokenBlacklisted(token);

      if (isBlacklisted) {
        return res.status(401).json({ message: "Token inválido o revocado" });
      }

      res.status(200).json({ message: "Token válido" });
    } catch (error) {
      next(error);
    }
  }
}

export default BlacklistController;

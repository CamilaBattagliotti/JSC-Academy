import * as jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import BlacklistService from "../services/blacklist";

async function checkJWT(req: any, res: Response, next: NextFunction) {
  // Obtiene el token desde el header Authorization
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(400).json({ message: "Token requerido" });
  }

  // Verificar si el token está en la lista negra
  const isBlacklisted = await BlacklistService.isTokenBlacklisted(token);
  if (isBlacklisted) {
    res.status(401).json({ error: "Token inválido o revocado" });
  }

  try {
    // Verifica si el token es válido
    const data = jwt.verify(token, process.env.ACCESS_SECRET_KEY as jwt.Secret);
    req._user = data; // Si es válido, asignamos la información del usuario
    next();
  } catch (error) {
    // Si el token ha expirado o es inválido
    res.status(401).json({ error: "Token inválido o expirado" });
  }
}

export default checkJWT;

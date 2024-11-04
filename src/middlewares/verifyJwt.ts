import * as jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { createToken } from "../utils/token";

function checkJWT(req: Request, res: Response, next: NextFunction) {
  // Obtiene el token desde el header Authorization
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(400).json({ message: "token is required" });
    return;
  }

  try {
    const data = jwt.verify(
      token,
      process.env.ACCESS_SECRET_KEY as jwt.Secret
    ) as any;

    // req._user = await getUserById(data.id);

    next();
  } catch (error) {
    // TokenExpiredError es un tipo de error específico que se lanza cuando el tiempo de validez definido en expiresIn ya pasò.
    if (error instanceof jwt.TokenExpiredError) {
      // El token ha expirado
      res.status(401).json({ error: "Token expirado" });
    }
    // Otro tipo de error de token
    res.status(401).json({ error: "Token invalido" });
  }
}

export default checkJWT;

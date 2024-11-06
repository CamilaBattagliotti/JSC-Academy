import * as jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import BlacklistService from "../services/blacklist";

async function checkJWT(req: any, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("entre al check", token);

  if (!token) {
    console.log("entre al try no hay token", token);
    res.status(400).json({ message: "Token requerido" });
    return;
  }

  try {
    const isBlacklisted = await BlacklistService.isTokenBlacklisted(token);
    if (isBlacklisted) {
      res.status(401).json({ error: "Token revocado" });
    }
    const data = jwt.verify(token, process.env.ACCESS_SECRET_KEY as jwt.Secret);
    req._user = data;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido o expirado" });
  }
}

export default checkJWT;

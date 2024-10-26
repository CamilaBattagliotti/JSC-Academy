import * as jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

function checkJWT(req: Request, res: Response, next: NextFunction) {
  // Obtiene el token desde el header Authorization
  const token = req.headers.authorization?.split(" ")[1];
  //console.log("Token recibido:", token);

  if (!token) {
    res.status(400).json({ message: "token is required" });
    return;
  }

  try {
    const data = jwt.verify(token, process.env.SECRET_KEY as jwt.Secret) as any;

    // req._user = await getUserById(data.id);

    next();
  } catch (error) {
    res.status(401).json({ error: "token inválido" });
    return;
  }
}

export default checkJWT;

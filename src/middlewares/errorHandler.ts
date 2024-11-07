import { NextFunction, Request, Response } from "express";
import Logger from "../lib/winston";

function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { statusCode, message } = error;
  Logger.error(message);

  res.status(statusCode || 500).json({ message: message });
}

export default errorHandler;

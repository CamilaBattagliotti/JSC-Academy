import { NextFunction, Request, Response } from "express";

function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { statusCode, message } = error;
  res.status(statusCode || 500).json({ message: message });
}

export default errorHandler;

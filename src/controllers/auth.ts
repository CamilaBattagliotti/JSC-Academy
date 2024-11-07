import { NextFunction, Request, Response } from "express";
import Auth from "../services/auth";
import AuthService from "../services/auth";

class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const auth = await Auth.register(req.body);

      res.status(201).json({ data: auth });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await AuthService.getAll();
      res.status(200).json({ data: users });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const auth = await Auth.login(req.body);
      res.status(200).json({ data: auth });
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: any, res: Response, next: NextFunction) {
    try {
      const token: any = req.headers.authorization?.split(" ")[1];
      if (!token) {
        res.status(400).json({ message: "Token requerido" });
      }
      const userId = req._user.id;

      await Auth.logout(token, userId);
      res.status(200).json({ message: "Logout exitoso" });
    } catch (error) {
      next(error);
    }
  }
  static async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.headers.refresh as string;

      const newAccessToken = await AuthService.refreshToken(refreshToken);

      res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;

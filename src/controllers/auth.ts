import { NextFunction, Request, Response } from "express";
import Auth from "../services/auth";
import AuthService from "../services/auth";

class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const auth = await Auth.register(req.body);

      res.status(200).json({ data: auth });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await AuthService.getAll();
      res.status(200).json({ data: users });
    } catch (error) {
      next(error); //hacer erroshandler
    }
  }

  // static async login(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const auth = await Auth.login(req.body);
  //     res.status(200).json({ data: auth });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json({ message: "Logout exitoso" });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;

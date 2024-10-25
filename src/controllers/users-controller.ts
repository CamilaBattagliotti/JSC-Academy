//controller recibe res req y responde al front.
import { Request, Response, NextFunction } from "express";
import UserService from "../services/users-service";
class UserController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getAll();
      res.status(200).json({ data: users });
    } catch (error) {
      next(error); //hacer erroshandler
    }
  }
}
export default UserController;

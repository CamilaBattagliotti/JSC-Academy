//controller recibe res req y responde al front.
import { Request, Response, NextFunction } from "express";
import UserService from "../services/users";
class UserController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getAll();
      res.status(200).json({ data: users });
    } catch (error) {
      next(error); //hacer erroshandler
    }
  }
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.create(req.body);

      res.status(201).json({ message: "User created", data: user });
    } catch (error) {
      next(error); //hacer erroshandler
    }
  }
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.getOne(req.params.id); //va a ser uuid?
      res.status(200).json({ data: user });
    } catch (error) {
      next(error); //hacer erroshandler
    }
  }
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.delete(req.params.id);
      res.status(200).json({ message: "User deleted", data: user });
    } catch (error) {
      next(error); //hacer erroshandler
    }
  }
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.update(req.params.id, req.body);
      res.status(201).json({ message: "User updated", data: user });
    } catch (error) {
      next(error); //hacer erroshandler
    }
  }
}
export default UserController;

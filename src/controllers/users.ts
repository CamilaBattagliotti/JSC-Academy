//controller recibe res req y responde al front.
import { Request, Response, NextFunction } from "express";
import UserService from "../services/users";
class UserController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getAll(req.query);
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
      const user = await UserService.getById(req.params.id); //va a ser uuid?
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
      res.status(201).json({ message: "User updated", data: user }); //manda user updated aunque no lo haga x id incorrecto jajaj
    } catch (error) {
      next(error);
    }
  }
  static async getByEmail(req: Request, res: Response, next: NextFunction) {
    //no se si esto va xq lo usa el auth
    try {
      const user = await UserService.getByEmail(req.body.email); //???
      res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  }
}
export default UserController;

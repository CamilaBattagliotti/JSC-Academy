import { Request, Response, NextFunction } from "express";
import ClassesService from "../services/classes";

class ClassesController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const classes = await ClassesService.getAll(req.query);
      res.status(200).json({ data: classes });
    } catch (error) {
      next(error);
    }
  }
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const classe = await ClassesService.create(req.body);

      res.status(201).json({ message: "Class created", data: classe });
    } catch (error) {
      next(error);
    }
  }
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const classe = await ClassesService.getById(req.params.id);
      res.status(200).json({ data: classe });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const classe = await ClassesService.delete(req.params.id);
      res.status(200).json({ message: "Class deleted", data: classe });
    } catch (error) {
      next(error);
    }
  }
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const classe = await ClassesService.update(req.params.id, req.body);
      res.status(200).json({ message: "Class updated", data: classe });
    } catch (error) {
      next(error);
    }
  }

  static async enroll(req: any, res: Response, next: NextFunction) {
    try {
      const classeId = req.params.id;

      await ClassesService.enroll(classeId, req._user.id);

      res.status(201).json({ message: "Successful enrollment" });
    } catch (error) {
      next(error);
    }
  }

  static async unroll(req: any, res: Response, next: NextFunction) {
    try {
      const userId = req._user.id;
      const classeId = req.params.id;
      const unroll = await ClassesService.unroll(classeId, userId);
      res.status(201).json({ message: "Successful unrollment" });
    } catch (error) {
      next(error);
    }
  }
}
export default ClassesController;

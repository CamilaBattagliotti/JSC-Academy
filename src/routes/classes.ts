import { Router } from "express";
import ClassesController from "../controllers/classes";

const classesRouter = Router();

classesRouter.post("/", ClassesController.create);
classesRouter.get("/", ClassesController.getAll);
classesRouter.get("/:id", ClassesController.getById);
classesRouter.patch("/:id", ClassesController.update);
classesRouter.delete("/:id", ClassesController.delete);

export default classesRouter;

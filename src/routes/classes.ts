import { Router } from "express";
import ClassesController from "../controllers/classes";
import checkJWT from "../middlewares/verifyJwt";

const classesRouter = Router();

classesRouter.post("/", checkJWT, ClassesController.create);
classesRouter.get("/", ClassesController.getAll);
classesRouter.get("/:id", ClassesController.getById);
classesRouter.patch("/:id", checkJWT, ClassesController.update);
classesRouter.delete("/:id", checkJWT, ClassesController.delete);
classesRouter.put("/signup/:id", checkJWT, ClassesController.enroll);
classesRouter.put("/unroll/:id", checkJWT, ClassesController.unroll);

export default classesRouter;

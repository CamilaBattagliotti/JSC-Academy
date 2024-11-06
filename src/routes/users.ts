import { Router } from "express";
import checkJWT from "../middlewares/verifyJwt";
import UserController from "../controllers/users";
const userRouter = Router();

userRouter.get("/", UserController.getAll);
userRouter.get("/:id", UserController.getById);
userRouter.delete("/:id", checkJWT, UserController.delete);
userRouter.patch("/:id", checkJWT, UserController.update);

export default userRouter;

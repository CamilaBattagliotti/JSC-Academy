import { Router } from "express";
import checkJWT from "../middlewares/verifyJwt";
import UserController from "../controllers/users";
const userRouter = Router();

userRouter.get("/", UserController.getAll); //aca llamo al controller funcion getAll
userRouter.get("/:id", UserController.getById); //aca llamo al controller funcion getbyid
userRouter.delete("/:id", checkJWT, UserController.delete); //aca llamo al controller funcion delete
userRouter.patch("/:id", checkJWT, UserController.update); //aca llamo al controller funcion update

export default userRouter;

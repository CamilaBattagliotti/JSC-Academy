import { Router } from "express";
import UserController from "../controllers/users";
const userRouter = Router();

userRouter.get("/", UserController.getAll); //aca llamo al controller funcion getAll
userRouter.get("/:id", UserController.getById); //aca llamo al controller funcion getbyid
//userRouter.post("/", UserController.create); //aca llamo al controller funcion create ---> la usa el Auth
userRouter.delete("/:id", UserController.delete); //aca llamo al controller funcion delete
userRouter.patch("/:id", UserController.update); //aca llamo al controller funcion update

export default userRouter;

import { Router } from "express";
import UserController from "../controllers/users-controller";
const userRouter = Router();

userRouter.get("/", UserController.getAll); //aca llamo al controller funcion getAll
userRouter.get("/:id"); //aca llamo al controller funcion getbyid
userRouter.post("/"); //aca llamo al controller funcion create ---> la usa el Auth
userRouter.delete("/:id"); //aca llamo al controller funcion delete
userRouter.patch("/:id"); //aca llamo al controller funcion update

export default userRouter;

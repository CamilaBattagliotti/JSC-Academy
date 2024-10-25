import { Router } from "express";
import userRouter from "./usersRouter";
const indexRouter = Router();

indexRouter.use("/users", userRouter);

export default indexRouter;

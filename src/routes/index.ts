import { Router } from "express";
import userRouter from "./users";
import authRouter from "./auth";
const indexRouter = Router();

indexRouter.use("/users", userRouter);
indexRouter.use("/auth", authRouter);

export default indexRouter;

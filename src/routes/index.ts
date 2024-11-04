import { Router } from "express";
import userRouter from "./users";
import authRouter from "./auth";
import classesRouter from "./classes";

const indexRouter = Router();

indexRouter.use("/users", userRouter);
indexRouter.use("/auth", authRouter);
indexRouter.use("/classes", classesRouter);

export default indexRouter;

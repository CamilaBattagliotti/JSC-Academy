import { Router } from "express";

import Auth from "../controllers/auth";

const authRouter = Router();

authRouter.post("/register", Auth.register);
authRouter.post("/login", Auth.login);
authRouter.post("/logout", Auth.logout);
authRouter.get("/", Auth.getAll);

export default authRouter;

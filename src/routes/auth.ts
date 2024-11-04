import { Router } from "express";

import Auth from "../controllers/auth";
import checkJWT from "../middlewares/verifyJwt";

const authRouter = Router();

authRouter.post("/register", Auth.register);
authRouter.post("/login", Auth.login);
authRouter.post("/logout", checkJWT, Auth.logout);
authRouter.get("/", Auth.getAll);
authRouter.post("/refresh-token", Auth.refreshToken);

export default authRouter;

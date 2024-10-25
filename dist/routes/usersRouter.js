"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = __importDefault(require("../controllers/users-controller"));
const userRouter = (0, express_1.Router)();
userRouter.get("/", users_controller_1.default.getAll); //aca llamo al controller funcion getAll
userRouter.get("/:id"); //aca llamo al controller funcion getbyid
userRouter.post("/"); //aca llamo al controller funcion create ---> la usa el Auth
userRouter.delete("/:id"); //aca llamo al controller funcion delete
userRouter.patch("/:id"); //aca llamo al controller funcion update
exports.default = userRouter;

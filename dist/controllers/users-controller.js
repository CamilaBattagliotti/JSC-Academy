"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_service_1 = __importDefault(require("../services/users-service"));
class UserController {
    static async getAll(req, res, next) {
        try {
            const users = await users_service_1.default.getAll();
            res.status(200).json({ data: users });
        }
        catch (error) {
            next(error); //hacer erroshandler
        }
    }
}
exports.default = UserController;

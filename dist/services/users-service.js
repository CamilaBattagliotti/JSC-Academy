"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//service logica de negocios..
const users_model_1 = __importDefault(require("../models/users-model"));
class UserService {
    static async getAll() {
        try {
            const users = await users_model_1.default.findAll();
            return users;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = UserService;

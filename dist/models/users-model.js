"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../database/db"));
const db_2 = require("../database/db");
const User = db_1.default.define("User", {
    id: {
        type: db_2.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: db_2.DataTypes.STRING,
        allowNull: false,
    },
    fullname: {
        type: db_2.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: db_2.DataTypes.STRING, //8 caracteres, numeros, mayusculas,minusculas y caracteres especiales----> zod?(regex..(?))
        allowNull: false,
    },
    email: {
        type: db_2.DataTypes.STRING,
        allowNull: false,
    },
    birthdate: {
        type: db_2.DataTypes.DATE,
        allowNull: false,
    },
    nationality: {
        type: db_2.DataTypes.STRING,
        allowNull: false,
    },
});
User.sync(); // check
exports.default = User;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = exports.DataTypes = void 0;
const sequelize_1 = require("sequelize");
Object.defineProperty(exports, "DataTypes", { enumerable: true, get: function () { return sequelize_1.DataTypes; } });
Object.defineProperty(exports, "Model", { enumerable: true, get: function () { return sequelize_1.Model; } });
const sequelize = new sequelize_1.Sequelize(); //url de nuestra db
//const sequelize = new Sequelize("process.env.DB_URI");
async function authenticate() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}
authenticate();
exports.default = sequelize;

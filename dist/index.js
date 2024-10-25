"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const api_json_1 = __importDefault(require("./swagger/api.json"));
app_1.default.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(api_json_1.default));
const PORT = 3000;
const startServer = async () => {
    try {
        app_1.default.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("Error al iniciar el servidor", error);
    }
};
startServer();

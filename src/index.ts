import app from "./app";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/api.json";
import Logger from "./lib/winston";

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = 3000;

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      Logger.info(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    Logger.error("Error al iniciar el servidor", error);
  }
};

startServer();

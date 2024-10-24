import app from "./app";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/api.json";

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = 3001;

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor", error);
  }
};

startServer();

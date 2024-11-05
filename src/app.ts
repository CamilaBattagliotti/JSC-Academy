import express from "express";
import morgan from "morgan";
import indexRouter from "./routes";
import errorHandler from "./middlewares/errorHandler";

//capa adicional de seguridad para tu aplicación Express al establecer encabezados HTTP que ayudan a proteger contra diversas vulnerabilidades. Integrarlo en tu aplicación es una buena práctica que debería considerarse en cualquier desarrollo web.
//import helmet from "helmet"
const helmet = require("helmet");

const app = express();
app.use(helmet()); // aplicará configuraciones predeterminadas.
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Welcome to JSC Academy Api!");
});

app.use("/", indexRouter);

app.use(errorHandler);

export default app;

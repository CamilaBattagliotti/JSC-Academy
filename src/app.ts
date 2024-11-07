import express from "express";
import morgan from "morgan";
import indexRouter from "./routes";
import errorHandler from "./middlewares/errorHandler";

const helmet = require("helmet");

const app = express();
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Welcome to JSC Academy Api!");
});

app.use("/", indexRouter);

app.use(errorHandler);

export default app;

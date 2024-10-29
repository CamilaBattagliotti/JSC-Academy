import express from "express";
import morgan from "morgan";
import indexRouter from "./routes";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Welcome to JSC Academy Api!");
});

app.use("/", indexRouter); //???

app.use(errorHandler);

export default app;

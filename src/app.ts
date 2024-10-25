import express from "express";
import morgan from "morgan";
import indexRouter from "./routes";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Welcome to JSC Academy Api!");
});

app.use("/", indexRouter); //???

export default app;

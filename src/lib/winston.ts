import { transports, format, createLogger } from "winston";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "info";
};

const winFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const winTransports = [
  new transports.File({ filename: "logs/all.log" }),
  new transports.File({
    filename: "logs/errors.log",
    level: "error",
    handleExceptions: true,
  }),
];

const Logger = createLogger({
  level: level(),
  levels,
  format: winFormat,
  transports: winTransports,
  exitOnError: false,
});

export default Logger;

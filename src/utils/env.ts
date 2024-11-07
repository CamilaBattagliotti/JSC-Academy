import { config } from "dotenv";

(function checkEnv() {
  const env = process.argv[2];
  if (env == "dev") {
    loadEnv();
  }
})();

function loadEnv() {
  config();
}

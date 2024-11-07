import { config } from "dotenv";

(function checkEnv() {
  console.log(process.argv[2]);

  const env = process.argv[2];

  if (env == "dev") {
    loadEnv();
  }
})();

function loadEnv() {
  config();
}

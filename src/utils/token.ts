import * as jwt from "jsonwebtoken";

function createToken(data: string | Object) {
  const accessToken = jwt.sign(data, process.env.ACCESS_SECRET_KEY, {
    expiresIn: "2h",
  });

  const refreshToken = jwt.sign(data, process.env.REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
}

export { createToken };

import * as jwt from "jsonwebtoken";

function createToken(data: string | Object) {
  // const token = jwt.sign(data, process.env.SECRET_KEY, {
  //   expiresIn: "2h", // ??? Lo dejamos asi? Ver
  // });

  // return token;

  // Aca creo el Access Token
  const accessToken = jwt.sign(data, process.env.ACCESS_SECRET_KEY, {
    expiresIn: "2h",
  });

  // Aca creo el Refresh Token (se solicita para obtener un nuevo acces token cuando este caduca)
  const refreshToken = jwt.sign(data, process.env.REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
}

export { createToken };

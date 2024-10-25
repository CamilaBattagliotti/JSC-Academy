import * as jwt from "jsonwebtoken";

function createToken(data: string | Object) {
  const token = jwt.sign(data, process.env.SECRET_KEY, {
    expiresIn: "1d", // ??? Lo dejamos asi? Ver
  });

  return token;
}

export { createToken };

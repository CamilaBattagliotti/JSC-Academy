import jwt from "jsonwebtoken";

function obtenerInformacionDelToken(token) {
  console.log("token que llega al helper", token);

  try {
    // Verifica y decodifica el token
    console.log("entyre al TRY", process.env.ACCESS_SECRET_KEY);

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_SECRET_KEY as jwt.Secret
    );
    console.log("TOKEN en utils", decoded);

    return decoded; // Retorna la información decodificada del token
  } catch (error) {
    console.error("Token expirado:", error.message);
    return null; // Retorna null si el token es inválido
  }
}

export default obtenerInformacionDelToken;

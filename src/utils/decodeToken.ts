// import jwt from "jsonwebtoken";

// function getInfoToken(token) {
//   try {
//     // Verifica y decodifica el token

//     const decoded = jwt.verify(
//       token,
//       process.env.ACCESS_SECRET_KEY as jwt.Secret
//     );

//     return decoded; // Retorna la información decodificada del token
//   } catch (error) {
//     console.error("Token expirado:", error.message);
//     return null; // Retorna null si el token es inválido
//   }
// }

// export default getInfoToken;

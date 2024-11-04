import Auth from "../models/auth";
import { createSaltAndHash, UUID } from "../utils/createHash";
import { createToken } from "../utils/token";
import UsersService from "./users";
import { validateSignup } from "../schemas/auth";
import * as jwt from "jsonwebtoken";

class AuthService {
  static async register(data: any) {
    try {
      // Valido los datos ingresados
      const result = validateSignup(data);

      if (!result.success) {
        //console.log(result.error, result.error.errors);

        const errorMessages = result.error.errors
          .map((err) => err.message)
          .join(". ");
        const error: any = new Error(
          `Los datos ingresados son inválidos: ${errorMessages}`
        );
        error["statusCode"] = 400;

        throw error;
      }
      const { username, fullname, email, password, birthdate, nationality } =
        result.data;

      // 1. Verificar si el email ya existe en la tabla de usuarios

      const existingUser = await UsersService.getByEmail(email);

      if (existingUser) {
        throw new Error("El usuario ya está registrado");
      }

      // 2. Crear el usuario en la tabla de `User`
      const newUser: any = await UsersService.create({
        username,
        fullname,
        email,
        birthdate,
        nationality,
      });

      // 3. Generar un salt único para este usuario
      const salt = UUID();

      // 4. Hashear la contraseña usando tu función `createSaltAndHash`
      const hashedPassword = createSaltAndHash(password, salt);

      // 5. Generar el token que contiene la información del rol
      const token = createToken({
        id: newUser.id,
        //email: newUser.email,
      });
      //console.log("hashed pass", hashedPassword);

      // 6. Guardar el password hasheado y el id del usuario.
      const authRecord = await Auth.create({
        userId: newUser.id, // el id del usuario recién creado
        password: hashedPassword, // la contraseña hasheada
      });

      return {
        message: "Usuario registrado exitosamente",
        newUser,
        token,
      };
    } catch (error: any) {
      throw new Error(error.message || "Error al registrar el usuario");
    }
  }

  static async getAll() {
    try {
      const users = await Auth.findAll();
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async login(data: any) {
    try {
      const { email, password } = data;

      // Buscar usuario por su email
      const user: any = await UsersService.getByEmail(email);

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      // Buscar las credenciales del usuario en la tabla 'Auth'
      const userAuth: any = await Auth.findOne({ where: { userId: user.id } });
      //console.log("el userid es:", user.id);

      if (!userAuth) {
        throw new Error("No se encontraron credenciales asociadas al usuario");
      }

      // Descomponer la contraseña almacenada (salt:hash)
      const [salt, storedHash] = userAuth.password.split(":");

      // Hashear la contraseña ingresada con el mismo salt
      const hashedPassword = createSaltAndHash(password, salt);

      // Comparar el hash almacenado con el hash generado
      if (hashedPassword === userAuth.password) {
        // Si coinciden, generar un nuevo token
        const token = createToken({ id: user.id, role: user.registrationType });

        return { message: "Login exitoso", token };
      } else {
        throw new Error("Contraseña incorrecta");
      }
    } catch (error) {
      throw error;
    }
  }
  static async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new Error("El refresh token es requerido");
    }

    try {
      // Verificar el refresh token con la clave secreta específica para refresh tokens
      const verified = jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET_KEY as jwt.Secret
      ) as any;

      // Crear un nuevo access token
      const newAccessToken = jwt.sign(
        { id: verified.id },
        process.env.ACCESS_SECRET_KEY as jwt.Secret,
        {
          expiresIn: "1h",
        }
      );

      return newAccessToken;
    } catch (error) {
      throw new Error("Refresh token invalido");
    }
  }
  static async logout(token: string) {
    try {
      // Busca un registro en la base de datos donde el token coincida
      const authUser = await Auth.findOne({ where: { token: token } });
      if (!authUser) {
        const error = new Error("Token invalido");
        error["statusCode"] = 401;
        throw error;
      }
      // Devuelve el usuario encontrado si todo está bien
      // Borrar el token de la base de datos
      await Auth.update({ token: "" }, { where: { token: token } });
      // console.log("user sin token
      console.log(authUser);

      // Devuelve el usuario encontrado
      return authUser;
      //await Auth.logout(req.body);
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;

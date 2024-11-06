import Auth from "../models/auth";
import { createSaltAndHash, UUID } from "../utils/createHash";
import { createToken } from "../utils/token";
import UsersService from "./users";
import { validateSignup, validateLogin } from "../schemas/auth";
import * as jwt from "jsonwebtoken";
import BlacklistService from "./blacklist";

class AuthService {
  static async register(data: any) {
    try {
      const result = validateSignup(data);

      if (!result.success) {
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
      });

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
      const result = validateLogin(data);

      if (!result.success) {
        const errorMessages = result.error.errors
          .map((err) => err.message)
          .join(". ");
        const error: any = new Error(
          `Los datos ingresados son inválidos: ${errorMessages}`
        );
        error["statusCode"] = 400;

        throw error;
      }
      const { email, password } = result.data;

      const user: any = await UsersService.getByEmail(email);

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      const userAuth: any = await Auth.findOne({ where: { userId: user.id } });

      if (!userAuth) {
        throw new Error("No se encontraron credenciales asociadas al usuario");
      }

      const [salt, storedHash] = userAuth.password.split(":");

      const hashedPassword = createSaltAndHash(password, salt);

      if (hashedPassword === userAuth.password) {
        const token = createToken({ id: user.id });

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
      const verified = jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET_KEY as jwt.Secret
      ) as any;

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

  static async logout(token: string, userId: string) {
    try {
      await BlacklistService.addToken(token, userId);

      await Auth.update({ token: "" }, { where: { token: token } });

      return { message: "Logout exitoso, token añadido a la lista negra" };
    } catch (error) {
      throw new Error("Error al realizar el logout: " + error.message);
    }
  }
}

export default AuthService;

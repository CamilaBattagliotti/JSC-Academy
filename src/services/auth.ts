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

      const existingUser = await UsersService.getByEmail(email);

      if (existingUser) {
        const error: any = new Error("El usuario ya está registrado");
        error["statusCode"] = 400;
        throw error;
      }

      const newUser: any = await UsersService.create({
        username,
        fullname,
        email,
        birthdate,
        nationality,
      });

      const salt = UUID();

      const hashedPassword = createSaltAndHash(password, salt);

      const token = createToken({
        id: newUser.id,
      });

      await Auth.create({
        userId: newUser.id,
        password: hashedPassword,
      });

      return {
        message: "Usuario registrado exitosamente",
        newUser,
        token,
      };
    } catch (error) {
      const registerError = new Error("Error al registrar el usuario");
      registerError["statusCode"] = 401;
      throw registerError;
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
        const error: any = new Error("Usuario no encontrado");
        error["statusCode"] = 404;
        throw error;
      }

      const userAuth: any = await Auth.findOne({ where: { userId: user.id } });

      if (!userAuth) {
        const error: any = new Error(
          "No se encontraron credenciales asociadas al usuario"
        );
        error["statusCode"] = 404;
        throw error;
      }

      const [salt, storedHash] = userAuth.password.split(":");

      const hashedPassword = createSaltAndHash(password, salt);

      if (hashedPassword === userAuth.password) {
        const token = createToken({ id: user.id });

        return { message: "Login exitoso", token };
      } else {
        const error: any = new Error("Contraseña incorrecta");
        error["statusCode"] = 401;
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }
  static async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      const error: any = new Error("El refresh token es requerido");
      error["statusCode"] = 401;
      throw error;
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
      const tokenError = new Error("Refresh token invalido");
      tokenError["statusCode"] = 403;
      throw tokenError;
    }
  }

  static async logout(token: string, userId: string) {
    try {
      await BlacklistService.addToken(token, userId);

      await Auth.update({ token: "" }, { where: { token: token } });

      return { message: "Logout exitoso, token añadido a la lista negra" };
    } catch (error) {
      const logoutError = new Error(
        "Error al realizar el logout: " + error.message
      );
      logoutError["statusCode"] = 400;
      throw logoutError;
    }
  }
}

export default AuthService;

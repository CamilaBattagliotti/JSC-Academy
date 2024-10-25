import Auth from "../models/auth";
import { createSaltAndHash, UUID } from "../utils/createHash";
import { createToken } from "../utils/token";
import UsersService from "./users-service";

class AuthService {
    static async register(data: any) {
    
        try {
          const { email, name, lastName, phoneNumber, password, registrationType } =
            data;
    
          // 1. Verificar si el email ya existe en la tabla de usuarios
          const existingUser = await UsersService.getByEmail(email);
          if (existingUser) {
            throw new Error("El usuario ya está registrado");
          }
        // 2. Crear el usuario en la tabla de `User`
      const newUser: any = await UsersService.create({
        name,
        lastName,
        phoneNumber,
        email,
        registrationType,
      });

      // 3. Generar un salt único para este usuario
      const salt = UUID();

      // 4. Hashear la contraseña usando tu función `createSaltAndHash`
      const hashedPassword = createSaltAndHash(password, salt);

      // 5. Generar el token que contiene la información del rol
      const token = createToken({
        id: newUser.id,
        email: newUser.email,
        role: newUser.registrationType,
      });
      //console.log("hashed pass", hashedPassword);

      // 6. Guardar el password hasheado y el id del usuario.
      const authRecord = await Auth.create({
        userId: newUser.id, // el id del usuario recién creado
        password: hashedPassword, // la contraseña hasheada
      });

      return {
        message: "Usuario registrado exitosamente",
        user: newUser,
        authRecord: authRecord,
        token: token,
      };
    } catch (error: any) {
      throw new Error(error.message || "Error al registrar el usuario");
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
    }}}


      export default AuthService;
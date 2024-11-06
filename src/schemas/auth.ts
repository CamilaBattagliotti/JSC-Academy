import { z } from "zod";

const registerSchema = z
  .object({
    username: z
      .string({
        required_error: "El nombre es requerido",
      })
      .min(3, { message: "El nombre debe tener mas de 3 caracteres" })
      .max(15, { message: "El nombre debe tener menos de 15 caracteres" }),
    email: z
      .string({
        required_error: "El email es requerido",
      })
      .email("El email ingresado tiene un formato invalido"),
    password: z
      .string({
        required_error: "La contrasena es requerida",
      })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y un carácter especial",
        }
      ),
    fullname: z
      .string({
        required_error: "El nombre completo es requerido",
      })
      .min(3, { message: "El nombre completo debe tener mas de 3 caracteres" })
      .max(20, {
        message: "El nombre completo debe tener menos de 20 caracteres",
      }),
    birthdate: z
      .string({
        required_error: "La fecha de nacimiento es requerida",
      })
      .date(),
    nationality: z.string(),
  })
  .strict();

export function validateSignup(data) {
  return registerSchema.safeParse(data);
}

const loginSchema = z
  .object({
    email: z
      .string({
        required_error: "El email es requerido",
      })
      .email("El email ingresado tiene un formato invalido"),
    password: z.string({
      required_error: "La contrasena es requerida",
    }),
  })
  .strict();

export function validateLogin(data) {
  return loginSchema.safeParse(data);
}

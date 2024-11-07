import { z } from "zod";

const userSchema = z
  .object({
    username: z
      .string({
        required_error: "El nombre de usuario es requerido",
      })
      .min(3, {
        message: "El nombre de usuario debe tener al menos 3 caracteres",
      })
      .max(20, {
        message: "El nombre de usuario debe tener menos de 20 caracteres",
      }),
    fullname: z
      .string({
        required_error: "El nombre completo es requerido",
      })
      .min(3, {
        message: "El nombre completo debe tener al menos 3 caracteres",
      })
      .max(40, {
        message: "El nombre completo debe tener menos de 40 caracteres",
      }),
    email: z
      .string({
        required_error: "El email es requerido",
      })
      .email("El email ingresado tiene un formato inválido"),
    birthdate: z
      .string({
        required_error: "La fecha de nacimiento es requerida",
      })
      .date(),
    nationality: z
      .string({
        required_error: "La nacionalidad es requerida",
      })
      .min(3, { message: "La nacionalidad debe tener al menos 3 caracteres" })
      .max(20, {
        message: "La nacionalidad debe tener menos de 20 caracteres",
      }),
  })
  .strict();

export function validateUser(data) {
  return userSchema.safeParse(data);
}

const userUpdateSchema = userSchema.partial();

export function validateUserUpdate(data) {
  return userUpdateSchema.safeParse(data);
}

import { z } from "zod";

const userSchema = z.object({
  name: z
    .string({
      required_error: "El nombre es requerido",
    })
    .min(3, { message: "El nombre debe tener mas de 3 caracteres" })
    .max(15, { message: "El nombre debe tener menos de 15 caracteres" })
    .optional(),
  email: z
    .string({
      required_error: "El email es requerido",
    })
    .email("El email ingresado tiene un formato invalido")
    .optional(),
  password: z
    .string({
      required_error: "La contrasena es requerida",
    })
    .min(6, { message: "La contrasena debe tener mas de 6 caracteres" })
    .max(15, {
      message: "La contrasena debe tener un maximo de 15 caracteres",
    })
    .optional(),
  lastName: z
    .string({
      required_error: "El apellido es requerido",
    })
    .min(3, { message: "El apellido debe tener mas de 3 caracteres" })
    .max(15, { message: "El apellido debe tener menos de 15 caracteres" })
    .optional(),
  phoneNumber: z
    .number({
      required_error: "El numero de telefono es requerido",
      invalid_type_error: "El numero de telefono debe ser un numero",
    })
    .int()
    .optional(),
  registrationType: z.enum(["Client", "Seller", "Admin"]).optional(),
});

export function validateUser(data: any) {
  return userSchema.safeParse(data);
}

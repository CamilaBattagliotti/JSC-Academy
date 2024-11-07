import { z } from "zod";

const classSchema = z
  .object({
    name: z
      .string({
        required_error: "El nombre de la clase es requerido",
      })
      .min(3, {
        message: "El nombre de la clase debe tener al menos 3 caracteres",
      })
      .max(50, {
        message: "El nombre de la clase debe tener menos de 50 caracteres",
      }),
    startDate: z
      .string({
        required_error: "La fecha de inicio es requerida",
      })
      .date(),
    endDate: z
      .string({
        required_error: "La fecha de finalización es requerida",
      })
      .date(),
  })
  .strict();

export function validateClass(data) {
  return classSchema.safeParse(data);
}

const updateClassSchema = classSchema.partial();

export function validateUpdatedClass(data) {
  return updateClassSchema.safeParse(data);
}

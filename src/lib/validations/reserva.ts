import { z } from "zod";

export const disponibilidadSchema = z.object({
  barberoId: z.string().uuid("El ID del barbero debe ser un UUID válido"),
  servicioId: z.string().uuid("El ID del servicio debe ser un UUID válido"),
  fecha: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe tener el formato YYYY-MM-DD"),
});

export type DisponibilidadInput = z.infer<typeof disponibilidadSchema>;

export const reservaSchema = z.object({
  barberoId: z.string().uuid("El ID del barbero debe ser un UUID válido"),
  servicioId: z.string().uuid("El ID del servicio debe ser un UUID válido"),
  inicio: z.string().datetime({
    offset: true,
    message: "La fecha y hora de inicio debe ser en formato ISO con zona horaria",
  }),
  nombre: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede superar los 100 caracteres"),
  telefono: z
    .string()
    .trim()
    .min(6, "El teléfono debe tener al menos 6 caracteres")
    .max(25, "El teléfono no puede superar los 25 caracteres")
    .regex(
      /^[0-9+() -]+$/,
      "El teléfono solo puede contener dígitos, +, paréntesis, espacios y guiones"
    ),
  email: z
    .string()
    .trim()
    .max(254, "El email no puede superar los 254 caracteres")
    .email("El formato del email es inválido")
    .optional()
    .or(z.literal("")),
});

export type ReservaInput = z.infer<typeof reservaSchema>;

"use server";

import { createClient } from "@/lib/supabase/server";
import { siteConfig } from "@/config/site.config";
import {
  disponibilidadSchema,
  type DisponibilidadInput,
} from "@/lib/validations/reserva";

export type Slot = {
  inicio: string;
  fin: string;
};

export type ObtenerDisponibilidadResultado =
  | { ok: true; slots: Slot[] }
  | { ok: false; error: string };

export type DisponibilidadResultado = ObtenerDisponibilidadResultado;

export async function obtenerDisponibilidad(
  input: DisponibilidadInput
): Promise<ObtenerDisponibilidadResultado> {
  const validacion = disponibilidadSchema.safeParse(input);

  if (!validacion.success) {
    return { ok: false, error: "Datos inválidos" };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.rpc("obtener_disponibilidad", {
    p_barbero_id: validacion.data.barberoId,
    p_servicio_id: validacion.data.servicioId,
    p_fecha: validacion.data.fecha,
    p_paso_minutos: siteConfig.booking.slotMinutes,
    p_zona: siteConfig.timezone,
  });

  if (error) {
    console.error("Error al obtener disponibilidad:", error);
    return { ok: false, error: "No pudimos cargar los horarios" };
  }

  return { ok: true, slots: data ?? [] };
}

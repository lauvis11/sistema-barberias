"use server";

import { createClient } from "@/lib/supabase/server";
import { reservaSchema, type ReservaInput } from "@/lib/validations/reserva";

type RpcResultado =
  | {
      ok: true;
      turno_id: string;
      inicio: string;
      fin: string;
    }
  | {
      ok: false;
      codigo: string;
      mensaje: string;
    };

export type ReservarTurnoResultado =
  | {
      ok: true;
      turnoId: string;
      inicio: string;
      fin: string;
    }
  | {
      ok: false;
      codigo: string;
      mensaje: string;
    };

export type ReservaResultado = ReservarTurnoResultado;

export async function reservarTurno(
  input: ReservaInput
): Promise<ReservarTurnoResultado> {
  const validacion = reservaSchema.safeParse(input);

  if (!validacion.success) {
    return {
      ok: false,
      codigo: "datos_invalidos",
      mensaje: validacion.error.issues[0]?.message ?? "Datos inválidos",
    };
  }

  const supabase = await createClient();

  const email =
    validacion.data.email && validacion.data.email.trim() !== ""
      ? validacion.data.email.trim()
      : undefined;

  const { data, error } = await supabase.rpc("reservar_turno_publico", {
    p_barbero_id: validacion.data.barberoId,
    p_servicio_id: validacion.data.servicioId,
    p_inicio: validacion.data.inicio,
    p_nombre: validacion.data.nombre,
    p_telefono: validacion.data.telefono,
    p_email: email,
  });

  if (error || !data) {
    console.error("Error al reservar turno:", error);
    return {
      ok: false,
      codigo: "error_servidor",
      mensaje: "No pudimos reservar el turno, intentá de nuevo",
    };
  }

  const resultadoRpc = data as unknown as RpcResultado;

  if (!resultadoRpc.ok) {
    return resultadoRpc;
  }

  return {
    ok: true,
    turnoId: resultadoRpc.turno_id,
    inicio: resultadoRpc.inicio,
    fin: resultadoRpc.fin,
  };
}

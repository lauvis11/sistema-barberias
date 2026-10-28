-- Migración: límite de turnos activos por teléfono en reservar_turno

-- 1. Índice para acelerar la búsqueda de turnos activos por teléfono normalizado
create index if not exists idx_turnos_telefono_activos
  on turnos (regexp_replace(telefono, '[^0-9]', '', 'g'), inicio)
  where estado in ('pendiente', 'confirmado');

-- 2. Redefinición de reservar_turno con validación de límite por teléfono
create or replace function reservar_turno(
  p_barbero_id uuid,
  p_servicio_id uuid,
  p_inicio timestamptz,
  p_nombre text,
  p_telefono text,
  p_email text default null,
  p_paso_minutos int default 30,
  p_zona text default 'America/Argentina/Tucuman',
  p_max_dias int default 30
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_max_turnos_activos int := 2; -- Cambiar acá el límite de turnos activos por teléfono
  v_turnos_activos     int;
  v_nombre   text := btrim(coalesce(p_nombre, ''));
  v_telefono text := btrim(coalesce(p_telefono, ''));
  v_email    text := nullif(btrim(coalesce(p_email, '')), '');
  v_servicio servicios%rowtype;
  v_fin      timestamptz;
  v_turno_id uuid;
begin
  -- 1. Validar datos del cliente
  if char_length(v_nombre) < 2 or char_length(v_nombre) > 100 then
    return jsonb_build_object('ok', false, 'codigo', 'nombre_invalido',
      'mensaje', 'Ingresá un nombre válido');
  end if;

  if v_telefono !~ '^[0-9+() -]{6,25}$'
     or char_length(regexp_replace(v_telefono, '[^0-9]', '', 'g')) < 6 then
    return jsonb_build_object('ok', false, 'codigo', 'telefono_invalido',
      'mensaje', 'Ingresá un teléfono válido');
  end if;

  if v_email is not null
     and (char_length(v_email) > 254 or v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$') then
    return jsonb_build_object('ok', false, 'codigo', 'email_invalido',
      'mensaje', 'Ingresá un email válido');
  end if;

  -- 2. Validar la fecha
  if p_inicio is null or p_inicio <= now() then
    return jsonb_build_object('ok', false, 'codigo', 'horario_pasado',
      'mensaje', 'Ese horario ya pasó');
  end if;

  if p_inicio > now() + make_interval(days => p_max_dias) then
    return jsonb_build_object('ok', false, 'codigo', 'fuera_de_rango',
      'mensaje', 'Todavía no se puede reservar para esa fecha');
  end if;

  -- 3. Servicio activo, barbero activo y que el barbero haga ese servicio
  select s.* into v_servicio
  from servicios s
  join barbero_servicios bs on bs.servicio_id = s.id
                           and bs.barbero_id = p_barbero_id
  join barberos b on b.id = bs.barbero_id
  where s.id = p_servicio_id
    and s.activo
    and b.activo;

  if not found then
    return jsonb_build_object('ok', false, 'codigo', 'servicio_no_disponible',
      'mensaje', 'Ese barbero no realiza el servicio elegido');
  end if;

  -- 4. Límite de turnos futuros activos por teléfono (comparando solo dígitos)
  select count(*) into v_turnos_activos
  from turnos t
  where regexp_replace(t.telefono, '[^0-9]', '', 'g') = regexp_replace(v_telefono, '[^0-9]', '', 'g')
    and t.estado in ('pendiente', 'confirmado')
    and t.inicio > now();

  if v_turnos_activos >= v_max_turnos_activos then
    return jsonb_build_object('ok', false, 'codigo', 'limite_turnos',
      'mensaje', 'Ya tenés ' || v_max_turnos_activos || ' turnos pendientes. Cancelá uno o esperá a que pase para reservar otro.');
  end if;

  -- 5. El horario debe ser un slot ofrecido por obtener_disponibilidad
  if not exists (
    select 1
    from obtener_disponibilidad(
      p_barbero_id,
      p_servicio_id,
      (p_inicio at time zone p_zona)::date,
      p_paso_minutos,
      p_zona
    ) d
    where d.inicio = p_inicio
  ) then
    return jsonb_build_object('ok', false, 'codigo', 'horario_no_disponible',
      'mensaje', 'Ese horario ya no está disponible, elegí otro');
  end if;

  -- 6. Insertar. Si alguien reservó el mismo hueco un instante antes,
  --    la exclusion constraint rechaza el insert.
  v_fin := p_inicio + v_servicio.duracion_minutos * interval '1 minute';

  begin
    insert into turnos (
      barbero_id, servicio_id, inicio, fin,
      nombre_cliente, telefono, email,
      precio, duracion_minutos
    ) values (
      p_barbero_id, p_servicio_id, p_inicio, v_fin,
      v_nombre, v_telefono, v_email,
      v_servicio.precio, v_servicio.duracion_minutos
    )
    returning id into v_turno_id;
  exception
    when exclusion_violation then
      return jsonb_build_object('ok', false, 'codigo', 'horario_no_disponible',
        'mensaje', 'Ese horario ya no está disponible, elegí otro');
  end;

  return jsonb_build_object(
    'ok', true,
    'turno_id', v_turno_id,
    'inicio', p_inicio,
    'fin', v_fin
  );
end;
$$;

-- 3. Permisos (solo service_role puede ejecutarla)
revoke all on function reservar_turno(uuid, uuid, timestamptz, text, text, text, int, text, int)
  from public, anon, authenticated;

grant execute on function reservar_turno(uuid, uuid, timestamptz, text, text, text, int, text, int)
  to service_role;


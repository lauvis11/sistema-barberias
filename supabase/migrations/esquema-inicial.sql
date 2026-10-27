-- Esquema inicial: barbería demo
-- Se ejecuta de una sola vez en una base vacía (SQL Editor de Supabase).

-- 1. EXTENSIÓN Y ENUM
create extension if not exists btree_gist with schema extensions;

create type estado_turno as enum
  ('pendiente', 'confirmado', 'cancelado', 'completado', 'no_asistio');

-- 2. TABLAS
create table servicios (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  descripcion text,
  categoria text,
  precio numeric(10,2) not null check (precio >= 0),
  duracion_minutos int not null check (duracion_minutos > 0),
  es_combo boolean not null default false,
  activo boolean not null default true
);

create table combo_items (
  combo_id uuid not null references servicios(id) on delete cascade,
  servicio_id uuid not null references servicios(id) on delete restrict,
  primary key (combo_id, servicio_id),
  check (combo_id <> servicio_id)
);

create table barberos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  apellido text not null,
  foto_url text,
  activo boolean not null default true
);

create table barbero_servicios (
  barbero_id uuid not null references barberos(id) on delete cascade,
  servicio_id uuid not null references servicios(id) on delete cascade,
  primary key (barbero_id, servicio_id)
);

create table horarios_trabajo (
  id uuid primary key default gen_random_uuid(),
  barbero_id uuid not null references barberos(id) on delete cascade,
  dia_semana smallint not null check (dia_semana between 0 and 6), -- 0 = domingo, 6 = sábado
  hora_inicio time not null,
  hora_fin time not null,
  check (hora_fin > hora_inicio)
);

create table bloqueos (
  id uuid primary key default gen_random_uuid(),
  barbero_id uuid references barberos(id) on delete cascade, -- null = todo el local
  inicio timestamptz not null,
  fin timestamptz not null,
  check (fin > inicio)
);

create table turnos (
  id uuid primary key default gen_random_uuid(),
  barbero_id uuid not null references barberos(id) on delete restrict,
  servicio_id uuid not null references servicios(id) on delete restrict,
  inicio timestamptz not null,
  fin timestamptz not null,
  nombre_cliente text not null,
  telefono text not null,
  email text,
  precio numeric(10,2) not null check (precio >= 0),          -- copia al reservar
  duracion_minutos int not null check (duracion_minutos > 0), -- copia al reservar
  estado estado_turno not null default 'confirmado',
  notas text,
  created_at timestamptz not null default now(),
  check (fin > inicio),

  -- anti-doble-reserva: un barbero no puede tener turnos superpuestos
  constraint turnos_sin_superposicion exclude using gist (
    barbero_id with =,
    tstzrange(inicio, fin) with &&
  ) where (estado <> 'cancelado')
);

-- 3. ÍNDICES
create index idx_turnos_inicio on turnos (inicio);
create index idx_turnos_servicio on turnos (servicio_id);
create index idx_turnos_estado_inicio on turnos (estado, inicio);
create index idx_horarios_barbero_dia on horarios_trabajo (barbero_id, dia_semana);
create index idx_bloqueos_barbero_inicio on bloqueos (barbero_id, inicio);
create index idx_barbero_servicios_servicio on barbero_servicios (servicio_id);

-- 4. RLS
alter table servicios enable row level security;
alter table combo_items enable row level security;
alter table barberos enable row level security;
alter table barbero_servicios enable row level security;
alter table horarios_trabajo enable row level security;
alter table bloqueos enable row level security;
alter table turnos enable row level security;

-- Identifica al admin por app_metadata.role = 'admin' en el JWT
create or replace function is_admin()
returns boolean
language sql
stable
set search_path = public
as $$
  select coalesce((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

-- Lectura pública del catálogo activo
create policy "servicios_lectura_publica" on servicios
  for select to anon, authenticated
  using (activo);

create policy "barberos_lectura_publica" on barberos
  for select to anon, authenticated
  using (activo);

create policy "combo_items_lectura_publica" on combo_items
  for select to anon, authenticated
  using (true);

create policy "barbero_servicios_lectura_publica" on barbero_servicios
  for select to anon, authenticated
  using (true);

-- Acceso total del admin
create policy "servicios_admin" on servicios
  for all to authenticated
  using (is_admin()) with check (is_admin());

create policy "combo_items_admin" on combo_items
  for all to authenticated
  using (is_admin()) with check (is_admin());

create policy "barberos_admin" on barberos
  for all to authenticated
  using (is_admin()) with check (is_admin());

create policy "barbero_servicios_admin" on barbero_servicios
  for all to authenticated
  using (is_admin()) with check (is_admin());

create policy "horarios_trabajo_admin" on horarios_trabajo
  for all to authenticated
  using (is_admin()) with check (is_admin());

create policy "bloqueos_admin" on bloqueos
  for all to authenticated
  using (is_admin()) with check (is_admin());

create policy "turnos_admin" on turnos
  for all to authenticated
  using (is_admin()) with check (is_admin());

-- 5. FUNCIÓN: obtener_disponibilidad
create or replace function obtener_disponibilidad(
  p_barbero_id uuid,
  p_servicio_id uuid,
  p_fecha date,
  p_paso_minutos int default 30,
  p_zona text default 'America/Argentina/Tucuman'
)
returns table (inicio timestamptz, fin timestamptz)
language sql
stable
security definer
set search_path = public
as $$
  with srv as (
    select s.duracion_minutos * interval '1 minute' as dur
    from servicios s
    join barbero_servicios bs on bs.servicio_id = s.id
                             and bs.barbero_id = p_barbero_id
    join barberos b on b.id = bs.barbero_id
    where s.id = p_servicio_id
      and s.activo
      and b.activo
  ),
  rangos as (
    select
      (p_fecha + h.hora_inicio) at time zone p_zona as desde,
      (p_fecha + h.hora_fin)    at time zone p_zona as hasta
    from horarios_trabajo h
    where h.barbero_id = p_barbero_id
      and h.dia_semana = extract(dow from p_fecha)::int
  ),
  candidatos as (
    select g as inicio, g + srv.dur as fin
    from rangos r
    cross join srv
    cross join lateral generate_series(
      r.desde,
      r.hasta - srv.dur,
      make_interval(mins => p_paso_minutos)
    ) g
  )
  select c.inicio, c.fin
  from candidatos c
  where c.inicio > now()
    and not exists (
      select 1 from bloqueos bl
      where (bl.barbero_id is null or bl.barbero_id = p_barbero_id)
        and tstzrange(bl.inicio, bl.fin) && tstzrange(c.inicio, c.fin)
    )
    and not exists (
      select 1 from turnos t
      where t.barbero_id = p_barbero_id
        and t.estado <> 'cancelado'
        and tstzrange(t.inicio, t.fin) && tstzrange(c.inicio, c.fin)
    )
  order by c.inicio;
$$;

grant execute on function obtener_disponibilidad(uuid, uuid, date, int, text)
  to anon, authenticated;

-- 6. FUNCIÓN: reservar_turno (interna, solo service_role)
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

  if v_telefono !~ '^[0-9+() -]{6,25}$' then
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

  -- 4. El horario debe ser un slot ofrecido por obtener_disponibilidad
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

  -- 5. Insertar. Si alguien reservó el mismo hueco un instante antes,
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

revoke all on function reservar_turno(uuid, uuid, timestamptz, text, text, text, int, text, int)
  from public, anon, authenticated;

grant execute on function reservar_turno(uuid, uuid, timestamptz, text, text, text, int, text, int)
  to service_role;

-- 7. FUNCIÓN: reservar_turno_publico (la que usa el frontend)
-- Valores fijos: paso 30 min, zona de Tucumán, 30 días hacia adelante.
-- Si cambian en site.config.ts, cambiarlos también acá.
create or replace function reservar_turno_publico(
  p_barbero_id uuid,
  p_servicio_id uuid,
  p_inicio timestamptz,
  p_nombre text,
  p_telefono text,
  p_email text default null
)
returns jsonb
language sql
security definer
set search_path = public
as $$
  select reservar_turno(
    p_barbero_id,
    p_servicio_id,
    p_inicio,
    p_nombre,
    p_telefono,
    p_email,
    30,
    'America/Argentina/Tucuman',
    30
  );
$$;

revoke all on function reservar_turno_publico(uuid, uuid, timestamptz, text, text, text)
  from public;

grant execute on function reservar_turno_publico(uuid, uuid, timestamptz, text, text, text)
  to anon, authenticated;
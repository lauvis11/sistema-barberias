-- Datos de demo (todos ficticios).
-- Ejecutar UNA sola vez, después de la migración. Si se repite, duplica los datos.
-- Para empezar de cero: truncate turnos, bloqueos, horarios_trabajo,
-- barbero_servicios, combo_items, barberos, servicios cascade;

begin;

insert into servicios (nombre, descripcion, categoria, precio, duracion_minutos, es_combo) values
  ('Corte clásico',      'Corte a tijera o máquina, con lavado',    'corte', 8000,  30, false),
  ('Corte degradado',    'Fade con terminación a navaja',           'corte', 10000, 45, false),
  ('Barba',              'Perfilado y arreglo con toalla caliente', 'barba', 6000,  30, false),
  ('Perfilado de cejas', 'Prolijado con navaja',                    'otros', 3000,  15, false),
  ('Coloración',         'Color completo o decoloración',           'color', 25000, 90, false),
  ('Corte + barba',      'Corte clásico y barba con descuento',     'combo', 13000, 60, true),
  ('Degradado + barba',  'Corte degradado y barba con descuento',   'combo', 15500, 75, true);

insert into combo_items (combo_id, servicio_id)
select c.id, s.id
from (values
  ('Corte + barba',     'Corte clásico'),
  ('Corte + barba',     'Barba'),
  ('Degradado + barba', 'Corte degradado'),
  ('Degradado + barba', 'Barba')
) v(combo, componente)
join servicios c on c.nombre = v.combo
join servicios s on s.nombre = v.componente;

insert into barberos (nombre, apellido) values
  ('Marcos',  'Ibáñez'),
  ('Lucas',   'Herrera'),
  ('Nicolás', 'Paz');

-- Marcos hace todo; Lucas y Nicolás todo menos coloración
insert into barbero_servicios (barbero_id, servicio_id)
select b.id, s.id
from barberos b
cross join servicios s
where b.nombre = 'Marcos'
   or (b.nombre in ('Lucas', 'Nicolás') and s.nombre <> 'Coloración');

-- Horarios (0 = domingo, 6 = sábado)
insert into horarios_trabajo (barbero_id, dia_semana, hora_inicio, hora_fin)
select b.id, d, r.i, r.f
from barberos b
cross join generate_series(2, 6) d
cross join (values ('09:00'::time, '13:00'::time), ('16:00'::time, '20:00'::time)) r(i, f)
where b.nombre = 'Marcos';

insert into horarios_trabajo (barbero_id, dia_semana, hora_inicio, hora_fin)
select b.id, d, r.i, r.f
from barberos b
cross join generate_series(2, 6) d
cross join (values ('10:00'::time, '14:00'::time), ('17:00'::time, '21:00'::time)) r(i, f)
where b.nombre = 'Lucas';

insert into horarios_trabajo (barbero_id, dia_semana, hora_inicio, hora_fin)
select b.id, d, r.i, r.f
from barberos b
cross join generate_series(1, 5) d
cross join (values ('09:00'::time, '13:00'::time), ('15:00'::time, '19:00'::time)) r(i, f)
where b.nombre = 'Nicolás';

-- Feriado de todo el local: el viernes de la semana que viene
insert into bloqueos (barbero_id, inicio, fin)
select
  null::uuid,
  (d::timestamp) at time zone 'America/Argentina/Tucuman',
  ((d + 1)::timestamp) at time zone 'America/Argentina/Tucuman'
from (
  select current_date + (((2 - extract(dow from current_date)::int + 6) % 7) + 1) + 3 as d
) x;

-- Turnos de demo ("martes" = el próximo martes)
with base as (
  select current_date + (((2 - extract(dow from current_date)::int + 6) % 7) + 1) as martes
)
insert into turnos (barbero_id, servicio_id, inicio, fin, nombre_cliente, telefono, email,
                    precio, duracion_minutos, estado)
select
  b.id,
  s.id,
  ((base.martes + v.dias) + v.hora) at time zone 'America/Argentina/Tucuman',
  ((base.martes + v.dias) + v.hora) at time zone 'America/Argentina/Tucuman'
    + s.duracion_minutos * interval '1 minute',
  v.cliente,
  v.tel,
  v.email,
  s.precio,
  s.duracion_minutos,
  v.estado::estado_turno
from base
cross join (values
  ('Marcos',  'Corte clásico',     -14, time '10:00', 'Juan Pérez',     '3815550101', 'juan@ejemplo.com',  'completado'),
  ('Lucas',   'Corte + barba',     -14, time '17:00', 'Pedro Gómez',    '3815550102', null,                'completado'),
  ('Marcos',  'Barba',             -13, time '18:00', 'Diego Ruiz',     '3815550103', null,                'no_asistio'),
  ('Nicolás', 'Corte degradado',   -12, time '09:00', 'Tomás Acosta',   '3815550104', 'tomas@ejemplo.com', 'completado'),
  ('Marcos',  'Corte clásico',     -12, time '10:00', 'Hugo Sosa',      '3815550105', null,                'cancelado'),
  ('Lucas',   'Degradado + barba', -12, time '18:00', 'Facundo Rojas',  '3815550106', null,                'completado'),
  ('Marcos',  'Corte clásico',       0, time '10:00', 'Mateo Díaz',     '3815550107', 'mateo@ejemplo.com', 'confirmado'),
  ('Marcos',  'Barba',               0, time '11:00', 'Bruno Silva',    '3815550108', null,                'confirmado'),
  ('Lucas',   'Corte + barba',       0, time '10:00', 'Iván Castro',    '3815550109', null,                'confirmado'),
  ('Nicolás', 'Corte degradado',     1, time '09:00', 'Lautaro Vega',   '3815550110', 'lauta@ejemplo.com', 'confirmado'),
  ('Marcos',  'Coloración',          1, time '16:00', 'Gonzalo Molina', '3815550111', null,                'pendiente')
) v(barbero, servicio, dias, hora, cliente, tel, email, estado)
join barberos b on b.nombre = v.barbero
join servicios s on s.nombre = v.servicio;

commit;
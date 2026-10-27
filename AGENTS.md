<!-- BEGIN:nextjs-agent-rules -->

# AGENTS.md

Guía para asistente de IA. Responder siempre en español. Priorizar cambios chicos, simples y fáciles de revisar.

## Cómo trabajar

### 1. No tocar lo que ya está escrito
- No reformatear, reindentar ni reordenar código existente que no tenga que ver con la tarea.
- No renombrar variables, archivos ni funciones por gusto personal.
- No hacer refactors, limpiezas ni "mejoras" que no se pidieron.
- Cada cambio debe tocar solo las líneas necesarias, para que el diff sea mínimo.

### 2. Reutilizar antes de crear
- Antes de escribir una función, hook, componente o esquema, buscar en el proyecto si ya existe algo equivalente (`src/lib`, `src/components`, `src/lib/validations`) y usarlo.
- Si existe algo parecido pero no alcanza, extenderlo en vez de crear uno nuevo desde cero.
- No duplicar lógica que ya vive en la base de datos (ver sección de arquitectura).

### 3. Soluciones simples para problemas simples
- Elegir la solución más directa que resuelva el problema.
- No agregar librerías, capas de abstracción, patrones ni configuración extra si no hacen falta.
- Si una tarea sencilla parece requerir mucho código, frenar y avisar en vez de avanzar.
- Si algo no está claro, preguntar antes de asumir.

## Proyecto

Demo de una web para barbería con sistema de turnos y panel de administración.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS (y shadcn/ui para el panel admin cuando se agregue)
- Supabase: PostgreSQL, Auth y RLS
- Zod para validar, date-fns y date-fns-tz para fechas
- Resend para emails
- Hosting en Vercel

## Decisiones ya tomadas (no proponer alternativas)

- **No se usa Express** ni otro backend aparte: la lógica vive en Supabase y en Server Actions.
- **No hay Google Calendar**.
- **Un único usuario admin**
- Los barberos son registros que gestiona el admin, no usuarios del sistema.


## Supabase

Dos clientes, cada uno desde su ruta (ambos exportan `createClient`, no mezclarlos):
- `@/lib/supabase/client`: solo en componentes con `"use client"` (login del admin).
- `@/lib/supabase/server`: en Server Components y Server Actions.

Variables de entorno: solo `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
Nunca escribir llaves reales en el código ni en archivos que se suban a Git.

## Modelo de datos

Tablas: `servicios`, `combo_items`, `barberos`, `barbero_servicios`, `horarios_trabajo`, `bloqueos`, `turnos`.
Enum `estado_turno`: pendiente, confirmado, cancelado, completado, no_asistio.

- Los combos son servicios con `es_combo = true`; sus componentes están en `combo_items`.
- `turnos` guarda copia de `precio` y `duracion_minutos` al reservar.
- Los turnos no se borran: se cambia el `estado`. Servicios y barberos se desactivan con `activo = false`.
- `horarios_trabajo.dia_semana`: **0 = domingo, 6 = sábado**.
- No inventar tablas ni columnas que no existan. Si hace falta una, proponerla como migración.

## Fechas y zona horaria

- La base guarda y devuelve instantes en UTC (`timestamptz`).
- Para mostrar o interpretar horas, usar `date-fns-tz` con `siteConfig.timezone`.
- Guardar el `inicio` original (ISO completo) del slot elegido y enviarlo tal cual a la reserva. El texto "10:30" es solo para mostrar.

## Configuración

- Todo lo que cambia entre clientes (nombre, textos, contacto, zona horaria, parámetros de reserva) vive en `src/config/site.config.ts`. No escribir esos valores a mano en los componentes.
- `slotMinutes`, `maxDaysAhead` y la zona horaria también están fijos dentro de `reservar_turno_publico`. Si se cambia uno, cambiarlo en ambos lugares.

## Convenciones

- Rutas con alias `@/`.
- Nombres del dominio en español (`turnos`, `barberos`, `servicios`), igual que en la base.
- Server Components por defecto; `"use client"` solo cuando haga falta interactividad.
- Los datos de ejemplo del repo son ficticios. Repo público: nada de secretos ni datos reales.

## Antes de dar una tarea por terminada

- `npm run build` debe pasar sin errores.
- Verificar que no se agregaron archivos de entorno ni llaves al commit.

<!-- END:nextjs-agent-rules -->

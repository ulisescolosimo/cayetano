# Configuración de Supabase - Tabla de Perfiles

Este documento explica cómo configurar la tabla de perfiles en Supabase.

## Pasos para crear la tabla

1. Ve a tu proyecto en Supabase Dashboard
2. Navega a **SQL Editor**
3. Copia y pega el contenido del archivo `migrations/create_profiles_table.sql`
4. Ejecuta la consulta

## Estructura de la tabla

La tabla `profiles` tiene los siguientes campos:

- `id` (UUID): Clave primaria que referencia a `auth.users(id)`
- `nombre` (TEXT): Nombre del usuario
- `apellido` (TEXT): Apellido del usuario
- `email` (TEXT): Email del usuario (se sincroniza con auth.users)
- `created_at` (TIMESTAMP): Fecha de creación
- `updated_at` (TIMESTAMP): Fecha de última actualización

## Políticas de Seguridad (RLS)

Se han configurado las siguientes políticas Row Level Security:

1. **SELECT**: Los usuarios solo pueden ver su propio perfil
2. **INSERT**: Los usuarios solo pueden crear su propio perfil
3. **UPDATE**: Los usuarios solo pueden actualizar su propio perfil

## Funcionalidades automáticas

- El campo `updated_at` se actualiza automáticamente cuando se modifica un registro
- El campo `created_at` se establece automáticamente al crear un registro

## Notas importantes

- La tabla se crea automáticamente cuando un usuario se registra (a través del hook `useProfile`)
- Si un usuario no tiene perfil, se crea uno vacío al intentar acceder
- El email se sincroniza desde `auth.users` pero también se guarda en la tabla para facilitar consultas


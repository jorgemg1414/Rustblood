# Configuración del Panel de Administración

## Paso 1: Ejecutar el esquema principal

Si no lo has hecho ya, ejecuta el esquema principal en Supabase (SQL Editor):

```sql
-- Contenido de schema.sql
```

## Paso 2: Configurar usuarios admins

1. Ve a **SQL Editor** en Supabase
2. Copia y ejecuta todo el contenido del archivo `admin-setup.sql`
3. Esto creará la tabla `admin_users` y las políticas de acceso

## Paso 3: Crear un usuario admin

### Opción A: Desde el panel de Supabase
1. Ve a **Authentication** → **Users** en Supabase
2. Haz clic en **"Add user"**
3. Ingresa un email y contraseña para el admin
4. Haz clic en **"Create user"**

### Opción B: Desde la consola SQL
```sql
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at)
VALUES (
    gen_random_uuid(),
    'tu-email@ejemplo.com',
    crypt('tu-contraseña', gen_salt('bf')),
    NOW()
);
```

## Paso 4: Registrar el usuario como admin

1. Obtén el ID del usuario que acabas de crear:
```sql
SELECT id FROM auth.users WHERE email = 'tu-email@ejemplo.com';
```

2. Inserta el usuario en la tabla `admin_users`:
```sql
INSERT INTO admin_users (id, email, is_super_admin)
VALUES ('TU-USER-ID', 'tu-email@ejemplo.com', true);
```

## Paso 5: Acceder al panel de admin

1. Inicia el servidor backend:
```bash
cd /home/jorge/Documentos/rustblood-web/backend
npm run dev
```

2. Abre el frontend en tu navegador (normalmente en `http://localhost:5173`)

3. Navega a la página de administración (usualmente en `/admin`)

4. Inicia sesión con el email y contraseña del usuario admin que creaste

## Paso 6: Probar el panel

Una vez iniciado sesión, deberías poder:
- **Gallery**: Agregar y eliminar fotos
- **News**: Crear y eliminar posts
- **Messages**: Ver y eliminar mensajes de contacto

## Solución de problemas

### Error "Access denied. Admin privileges required"
- Asegúrate de haber ejecutado el archivo `admin-setup.sql`
- Verifica que el usuario esté en la tabla `admin_users`
- Comprueba que el usuario tenga `is_super_admin = true`

### Error "Invalid token"
- Asegúrate de que el usuario esté activo en Supabase Auth
- Verifica que el email del usuario coincida con el registrado

### Error con la tabla `admin_users`
- Ejecuta de nuevo el archivo `admin-setup.sql`
- Verifica que la tabla se creó correctamente en Supabase

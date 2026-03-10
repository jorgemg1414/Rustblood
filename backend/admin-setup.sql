-- Configuración de usuarios admins para Rustblood Web

-- 1. Crear tabla para almacenar usuarios admins
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    is_super_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Habilitar RLS en la tabla de admins
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- 3. Políticas de acceso para la tabla de admins
CREATE POLICY "Admins can manage admins" ON admin_users
    FOR ALL USING (
        auth.uid() IN (SELECT id FROM admin_users WHERE is_super_admin = true)
    );

-- 4. Función para verificar si un usuario es admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM admin_users WHERE id = user_id
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Políticas mejoradas para las tablas existentes
-- Gallery: solo admins pueden insertar/eliminar
CREATE POLICY "Admins can manage gallery" ON gallery
    FOR ALL USING (is_admin(auth.uid()));

-- Posts: solo admins pueden insertar/eliminar
CREATE POLICY "Admins can manage posts" ON posts
    FOR ALL USING (is_admin(auth.uid()));

-- Messages: admins pueden leer/eliminar, todos pueden insertar
CREATE POLICY "Admins can manage messages" ON messages
    FOR ALL USING (is_admin(auth.uid()));

-- 6. Insertar un usuario admin de ejemplo (REEMPLAZA con tu email)
-- Primero, crea un usuario en Supabase Auth, luego ejecuta:
-- INSERT INTO admin_users (id, email, is_super_admin)
-- VALUES ('TU-USER-ID', 'tu-email@ejemplo.com', true);

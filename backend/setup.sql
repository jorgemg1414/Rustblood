-- ============================================
-- RUSTBLOOD WEB - Supabase Database Setup
-- Ejecutar en Supabase SQL Editor
-- ============================================

-- 1. Tablas principales
-- ============================================

CREATE TABLE IF NOT EXISTS gallery (
    id BIGSERIAL PRIMARY KEY,
    title TEXT DEFAULT 'Concert',
    image_url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS posts (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    is_super_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Funcion para verificar admin
-- ============================================

CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM admin_users WHERE id = user_id
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Habilitar RLS
-- ============================================

ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- 4. Politicas RLS
-- ============================================

-- Gallery: publico puede ver, admins pueden todo
DROP POLICY IF EXISTS "Public can view gallery" ON gallery;
CREATE POLICY "Public can view gallery" ON gallery
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can insert gallery" ON gallery;
CREATE POLICY "Admins can insert gallery" ON gallery
    FOR INSERT WITH CHECK (is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can update gallery" ON gallery;
CREATE POLICY "Admins can update gallery" ON gallery
    FOR UPDATE USING (is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can delete gallery" ON gallery;
CREATE POLICY "Admins can delete gallery" ON gallery
    FOR DELETE USING (is_admin(auth.uid()));

-- Posts: publico puede ver, admins pueden todo
DROP POLICY IF EXISTS "Public can view posts" ON posts;
CREATE POLICY "Public can view posts" ON posts
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can insert posts" ON posts;
CREATE POLICY "Admins can insert posts" ON posts
    FOR INSERT WITH CHECK (is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can update posts" ON posts;
CREATE POLICY "Admins can update posts" ON posts
    FOR UPDATE USING (is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can delete posts" ON posts;
CREATE POLICY "Admins can delete posts" ON posts
    FOR DELETE USING (is_admin(auth.uid()));

-- Messages: publico puede insertar, admins pueden ver/eliminar
DROP POLICY IF EXISTS "Public can insert messages" ON messages;
CREATE POLICY "Public can insert messages" ON messages
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view messages" ON messages;
CREATE POLICY "Admins can view messages" ON messages
    FOR SELECT USING (is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can delete messages" ON messages;
CREATE POLICY "Admins can delete messages" ON messages
    FOR DELETE USING (is_admin(auth.uid()));

-- Admin users: solo super admins pueden gestionar
DROP POLICY IF EXISTS "Super admins can manage admins" ON admin_users;
CREATE POLICY "Super admins can manage admins" ON admin_users
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE id = auth.uid() AND is_super_admin = true
        )
    );

-- 5. Storage bucket para galeria
-- ============================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Politicas de storage
DROP POLICY IF EXISTS "Public can view gallery files" ON storage.objects;
CREATE POLICY "Public can view gallery files" ON storage.objects
    FOR SELECT USING (bucket_id = 'gallery');

DROP POLICY IF EXISTS "Admins can upload gallery files" ON storage.objects;
CREATE POLICY "Admins can upload gallery files" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'gallery' AND is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can delete gallery files" ON storage.objects;
CREATE POLICY "Admins can delete gallery files" ON storage.objects
    FOR DELETE USING (bucket_id = 'gallery' AND is_admin(auth.uid()));

-- 6. Insertar admin de ejemplo (CAMBIAR POR TU EMAIL)
-- ============================================

-- Primero crea tu usuario en Supabase Auth > Authentication > Users
-- Luego ejecuta esto reemplazando los valores:
-- INSERT INTO admin_users (id, email, is_super_admin)
-- VALUES (
--     (SELECT id FROM auth.users WHERE email = 'tu-email@ejemplo.com' LIMIT 1),
--     'tu-email@ejemplo.com',
--     true
-- );

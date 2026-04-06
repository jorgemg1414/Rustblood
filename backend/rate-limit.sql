-- ============================================
-- RUSTBLOOD WEB - Rate limiting table & function
-- Ejecutar en Supabase SQL Editor
-- ============================================

-- Tabla para contadores de rate limit
CREATE TABLE IF NOT EXISTS rate_limits (
    key TEXT PRIMARY KEY,
    count INT NOT NULL DEFAULT 0,
    window_start TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS rate_limits_window_start_idx
    ON rate_limits(window_start);

-- RLS activado: solo el service role (backend) puede acceder.
-- Sin policies = bloqueado para anon/authenticated.
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- Funcion atomica: incrementa el contador y devuelve true si esta dentro del limite,
-- false si lo ha superado. Resetea la ventana si ha expirado.
CREATE OR REPLACE FUNCTION check_rate_limit(
    p_key TEXT,
    p_max INT,
    p_window_seconds INT
) RETURNS BOOLEAN AS $$
DECLARE
    v_count INT;
    v_now TIMESTAMPTZ := NOW();
    v_window_cutoff TIMESTAMPTZ := v_now - (p_window_seconds || ' seconds')::INTERVAL;
BEGIN
    INSERT INTO rate_limits (key, count, window_start)
    VALUES (p_key, 1, v_now)
    ON CONFLICT (key) DO UPDATE SET
        count = CASE
            WHEN rate_limits.window_start < v_window_cutoff THEN 1
            ELSE rate_limits.count + 1
        END,
        window_start = CASE
            WHEN rate_limits.window_start < v_window_cutoff THEN v_now
            ELSE rate_limits.window_start
        END
    RETURNING count INTO v_count;

    RETURN v_count <= p_max;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Funcion de limpieza: borra entradas antiguas (mas de 1 dia).
-- Ejecutar manualmente o via pg_cron si lo tienes habilitado.
CREATE OR REPLACE FUNCTION cleanup_rate_limits()
RETURNS INT AS $$
DECLARE
    v_deleted INT;
BEGIN
    DELETE FROM rate_limits
    WHERE window_start < NOW() - INTERVAL '1 day';
    GET DIAGNOSTICS v_deleted = ROW_COUNT;
    RETURN v_deleted;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Opcional: si tienes pg_cron habilitado, ejecuta esto para limpieza automatica cada hora:
-- SELECT cron.schedule('cleanup-rate-limits', '0 * * * *', 'SELECT cleanup_rate_limits()');

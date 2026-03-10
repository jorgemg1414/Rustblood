# Configuración de Vercel para Rustblood Web

## Variables de Entorno en Vercel

Configura las siguientes variables de entorno en tu proyecto de Vercel:

### Supabase Configuration
1. **SUPABASE_URL**
   - Valor: `https://euqdhvxymafoylzckhgj.supabase.co`
   - Ambiente: Production, Preview

2. **SUPABASE_SERVICE_ROLE_KEY**
   - Valor: Tu clave de servicio de Supabase (NO la clave anon)
   - Ambiente: Production, Preview
   - Nota: Esta clave debe mantenerse secreta y solo usarse en el backend

### Frontend Configuration (Opcional)
3. **VITE_SUPABASE_URL**
   - Valor: `https://euqdhvxymafoylzckhgj.supabase.co`
   - Ambiente: Production, Preview

4. **VITE_SUPABASE_ANON_KEY**
   - Valor: `sb_publishable_jDX3NN8X4HAgih6vPjje0w_Y-CqT2Rm`
   - Ambiente: Production, Preview

## Cómo configurar en Vercel

1. Ve a tu proyecto en Vercel
2. Click en "Settings" > "Environment Variables"
3. Agrega cada variable con su valor correspondiente
4. Asegúrate de marcar las variables de Supabase como "Secret" si es posible
5. Haz un nuevo deploy para que los cambios surtan efecto

## Estructura del Proyecto

```
rustblood-web/
├── api/                    # Serverless Functions de Vercel
│   ├── gallery.js
│   ├── posts.js
│   └── messages.js
├── backend/                # Backend Express (opcional)
│   ├── server.js
│   ├── routes/
│   └── package.json
├── src/                    # Frontend Vue.js
│   ├── api.ts             # Cliente API para el backend
│   ├── views/             # Vistas de la aplicación
│   └── supabase.ts        # Configuración de Supabase (solo autenticación)
├── dist/                   # Frontend compilado
└── vercel.json            # Configuración de Vercel
```

## Flujo de Autenticación

1. **Frontend**: Usa Supabase SDK para autenticación (clave anon)
2. **Backend**: Usa Supabase Service Role Key para operaciones de base de datos
3. **API**: Valida tokens de autenticación antes de permitir operaciones CRUD

## Seguridad Mejorada

- ✅ Credenciales de Supabase movidas al backend
- ✅ Autenticación requerida para operaciones CRUD
- ✅ Clave de servicio usada solo en el backend
- ✅ CORS configurado apropiadamente
- ✅ Validación de entrada en el backend

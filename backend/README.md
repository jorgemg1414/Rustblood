# Backend Rustblood Web

Backend API para la página web de la banda Rustblood.

## Configuración

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
   - Copiar `.env.example` a `.env`
   - Configurar las credenciales de Supabase

## Variables de Entorno

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
PORT=3001
```

## Ejecutar localmente

```bash
npm run dev
```

## API Endpoints

### Galería
- `GET /api/gallery` - Obtener todas las fotos (público)
- `POST /api/gallery` - Agregar foto (admin)
- `DELETE /api/gallery/:id` - Eliminar foto (admin)

### Posts
- `GET /api/posts` - Obtener todos los posts (público)
- `GET /api/posts/:id` - Obtener un post específico (público)
- `POST /api/posts` - Crear post (admin)
- `DELETE /api/posts/:id` - Eliminar post (admin)

### Mensajes
- `GET /api/messages` - Obtener todos los mensajes (admin)
- `POST /api/messages` - Enviar mensaje (público)
- `DELETE /api/messages/:id` - Eliminar mensaje (admin)

## Despliegue en Vercel

El backend está configurado para funcionar con Vercel Serverless Functions.

1. Configurar variables de entorno en Vercel:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

2. El backend se desplegará automáticamente junto con el frontend.

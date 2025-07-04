# experiencias_backend

API REST para la gestión de experiencias y reservas.

## Requisitos

- Node.js >= 16
- MySQL
- npm

## Instalación

1. **Clona el repositorio:**

   ```sh
   git clone <URL_DEL_REPO>
   cd Backend
   ```

2. **Instala las dependencias:**

   ```sh
   npm install
   ```

3. **Configura las variables de entorno:**

   Renombra el archivo `.env.example` a `.env` si existe, o edita el archivo `.env` con tus datos de conexión MySQL y la clave secreta JWT.

   Ejemplo de `.env`:
   ```
   HOST='localhost'
   PORT='3306'
   USER='root'
   PASSWORD=''
   DATABASE='experiencias_prueba'
   CHARSET='utf8mb4'
   PUERTO='3000'
   SECRET_KEY='Tmm2PNCPuIG30OsK0we8YOk4NfXl'
   ```

4. **Configura la base de datos:**

   Crea la base de datos y las tablas necesarias en MySQL según tu modelo de datos.

## Ejecución

Para iniciar el servidor en modo desarrollo:

```sh
npm run dev
```

El servidor se ejecutará en el puerto definido en `.env` (por defecto `3000`).

## Endpoints principales

- `POST /api/login` — Login de usuario
- `POST /api/create_users` — Registro de usuario
- `GET /api/users` — Listar usuarios (requiere autenticación)
- `GET /api/experiencias` — Listar experiencias(requiere autenticación)
- `POST /api/agregar_experiencia` — Agregar experiencia (requiere autenticación)
- `POST /api/reservarExperiencia` — Reservar experiencia (requiere autenticación)
- `GET /api/reservas` — Listar reservas (requiere autenticación)
- `GET /api/disponibilidad` — Consultar disponibilidad (requiere autenticación)

## Notas

- El backend utiliza JWT para autenticación. Incluye el token en el header `Authorization: Bearer <token>` para las rutas protegidas.
- El CORS está configurado para permitir peticiones desde `http://localhost:5173` y `http://localhost:3000`.

---

Desarrollado por Josue
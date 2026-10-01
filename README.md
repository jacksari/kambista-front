# Kambista Client

Frontend del reto tecnico de Kambista, construido con Nuxt, TypeScript, Nuxt UI y Tailwind CSS.

## Requisitos

- Node.js 22.19 o superior.
- npm 10 o superior.

## Configuracion local

1. Instalar las dependencias:

   ```bash
   npm install
   ```

2. Crear el archivo de variables de entorno:

   ```bash
   cp .env.example .env
   ```

3. Iniciar el entorno de desarrollo:

   ```bash
   npm run dev
   ```

La aplicación se inicia en `http://localhost:3001`. Por defecto espera que la API esté disponible en `http://localhost:3000/v1`.

## Scripts

- `npm run dev`: inicia Nuxt en modo desarrollo.
- `npm run build`: genera el build de producción.
- `npm run preview`: sirve localmente el build generado.
- `npm run lint`: ejecuta ESLint.

## Estructura

El codigo fuente vive en `src/` y se organiza por funcionalidades. Los componentes y composables propios de cada flujo permanecen dentro de `features/`; los recursos compartidos se ubican en sus carpetas globales correspondientes.

## Autenticación

La sesión utiliza el token retornado por `POST /auth/login` o `POST /auth/register`. Después de recibirlo, el cliente consulta `GET /auth/profile` para obtener al usuario autenticado. Al recargar una ruta protegida, el middleware valida nuevamente el token contra el perfil.

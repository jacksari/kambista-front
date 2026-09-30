# Kambista Client

Frontend del reto tecnico de Kambista, construido con Nuxt, TypeScript, Nuxt UI y Tailwind CSS.

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

## Scripts

- `npm run dev`: inicia Nuxt en modo desarrollo.
- `npm run build`: genera el build de produccion.
- `npm run preview`: sirve localmente el build generado.
- `npm run lint`: ejecuta ESLint.

## Estructura

El codigo fuente vive en `src/` y se organiza por funcionalidades. Los componentes y composables propios de cada flujo permanecen dentro de `features/`; los recursos compartidos se ubican en sus carpetas globales correspondientes.


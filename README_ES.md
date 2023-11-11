# Aprenda Next.js

¡Bienvenido al curso Next.js App Router! En este curso interactivo gratuito, aprenderá las características principales de Next.js mediante la creación de una aplicación web completa.

![Vista princiapal de la Aplicación Acme en múltiples dispositivos](https://nextjs.org/_next/image?url=%2Flearn%2Fcourse-explainer.png&w=750&q=75&dpl=dpl_Ejtt9BCyCFNeRJdBoVsM9Es9x8xe)

Para este curso, crearemos una versión simplificada de un panel financiero que tiene:

- Una página de inicio pública.
- Una página de inicio de sesión.
- Páginas del panel que están protegidas mediante autenticación.
- La capacidad de los usuarios para agregar, editar y eliminar facturas.
- El panel también tendrá una base de datos adjunta, que configurará en un capítulo posterior.

## Descripción general

A continuación se ofrece una descripción general de las funciones que aprenderemos en este curso:

- [**Estilo:**] las diferentes formas de diseñar su aplicación en Next.js.
- [**Optimizaciones:**] cómo optimizar imágenes, enlaces y fuentes.
- [**Enrutamiento:**] cómo crear diseños y páginas anidados utilizando el enrutamiento del sistema de archivos.
- [**Obtención de datos:**] cómo configurar una base de datos en Vercel y mejores prácticas para la obtención y transmisión por secuencias.
- [**Renderizado estatico y dinámico:**] qué es el renderizado estático y cómo puede mejorar el rendimiento de su aplicación y qué es el renderizado dinámico y como usarlo.
- [**Streaming**] qué es el streaming y cuándo puedes utilizarlo con loading, Suspense y esqueletos de carga.
- [**Búsqueda y paginación:**] cómo implementar la búsqueda y paginación utilizando parámetros de búsqueda de URL.
- [**Mutación de datos:**] cómo mutar datos usando React Server Actions y revalidar el caché de Next.js.
- [**Manejo de errores:**] cómo manejar errores generales y 404 no encontrados.
- [**Validación y accesibilidad de formularios:**] cómo realizar la validación de formularios del lado del servidor y consejos para mejorar la accesibilidad.
- [**Autenticación:**] cómo agregar autenticación a su aplicación usando NextAuth.js y Middleware.
- [**Metadatos:**] cómo agregar metadatos y preparar su aplicación para compartir en redes sociales.

> ⚠️ Nota ⚠️
>
> Este curso supone que tienes conocimientos básicos de React y JavaScript/TypeScript.
>
> Requisitos del Sistema:
>
> - Node.js 18 o posterior instalado.
> - Sistemas operativos: macOS, Windows (incluido WSL) o Linux.
> - Además, también necesitarás una cuenta de GitHub y una cuenta de Vercel.

## Inicio del Proyecto

Para iniciar nuestro proyecto, abriremos una terminal en la carpeta donde queremos guardarlo y a continuación usaremos el siguiente comando:

```bash
npx create-next-app@latest nombre-del-proyecto --use-npm --example "https://
github.com/vercel/next-learn/tree/main/dashboard/starter-example"
```

Este comando utiliza create-next-app, una herramienta de interfaz de línea de comandos (CLI) que configura una aplicación Next.js. Note que puede nombrar el proyecto como prefiera en `nombre-del-proyecto` que está a modo de ejemplo y además estamos usando los siguientes indicadores:

- `--use-npm` para indicar el administrador de paquetes queremos utilizar. 
- `--example` para indicar una plantilla con la cual iniciar, necesaria para seguir este curso.

## Estructura de carpetas

Después de la instalación, abra el proyecto en su editor de código.
Notarás que el proyecto tiene la siguiente estructura de carpetas:

![Estructura de carpetas del proyecto](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Flearn-folder-structure.png&w=1920&q=75&dpl=dpl_Ejtt9BCyCFNeRJdBoVsM9Es9x8xe)

- **/app:** contiene todas las rutas, componentes y lógica de su aplicación; aquí es desde donde trabajará principalmente.
- **/app/lib:** contiene funciones utilizadas en su aplicación, como funciones de utilidad reutilizables y funciones de recuperación de datos.
- **/app/ui:** contiene todos los componentes de la interfaz de usuario de su aplicación, como tarjetas, tablas y formularios.
- **/public:** contiene todos los activos estáticos de su aplicación, como imágenes.
- **/script/:** contiene un script de inicialización que utilizaremos para completar la base de datos en un capítulo posterior.
- **Archivos de configuración:** también notará archivos de configuración como **next.config.js** en la raíz de su aplicación. La mayoría de estos archivos se crean y preconfiguran cuando inicias un nuevo proyecto usando create-next-app.
- **app/lib/placeholder-data.js:** Para este proyecto, proporcionamos algunos datos de marcador de posición en cada objeto JavaScript en el archivo representa una tabla en su base de datos.
- **/app/lib/definitions.ts**. Aquí, definimos manualmente los tipos que se devolverán desde la base de datos.
> Estamos declarando manualmente los tipos de datos, pero para una mayor seguridad de tipos, recomendamos Prisma, que genera automáticamente tipos basados en el esquema de su base de datos.

## Ejecutando el servidor de desarrollo

Ejecute npm i para instalar los paquetes del proyecto.
Seguido de npm run dev para iniciar el servidor de desarrollo.

```bash
npm i

npm run dev
```

npm run dev inicia su servidor de desarrollo Next.js en el puerto 3000. Comprobemos si está funcionando. Abra http://localhost:3000 en su navegador. Su página de inicio debería verse así:

![Página de inicio del proyecto](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Facme-unstyled.png&w=750&q=75&dpl=dpl_Ejtt9BCyCFNeRJdBoVsM9Es9x8xe)


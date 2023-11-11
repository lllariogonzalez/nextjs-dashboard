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

- [**Estilo:**](#estilo-css) las diferentes formas de diseñar su aplicación en Next.js.
- [**Optimizaciones:**](#optimización-de-fuentes-e-imágenes) cómo optimizar imágenes, enlaces y fuentes.
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

---

## Estilo CSS

Actualmente, su página de inicio no tiene ningún estilo. Veamos las diferentes formas en que puede diseñar su aplicación Next.js.


1. Agregar un archivo CSS global a su aplicación.

    - Si miras dentro de la carpeta **/app/ui**, verás un archivo llamado **global.css**. Puede utilizar este archivo para agregar reglas CSS a todas las rutas de su aplicación, como reglas de restablecimiento de CSS, estilos de todo el sitio para elementos HTML como enlaces y más.

    - Agregue estilos globales a su aplicación navegando a **/app/layout.tsx** e importando el archivo global.css:

        ```tsx
        // importamos el archivo con los estilos globales
        import '@/app/ui/global.css'; 
        // en el RootLayout, el cual tiene la disposición de toda la app
        export default function RootLayout({
        children,
        }: {
        children: React.ReactNode;
        }) {
        return (
            <html lang="en">
            <body>{children}</body>
            </html>
        );
        }
        ```

        Con el servidor de desarrollo aún en ejecución, guarde los cambios y obtenga una vista previa de ellos en el navegador. Su página de inicio ahora debería verse así:

        ![Página de inicio con estilos globales aplicados](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Fhome-page-with-tailwind.png&w=1080&q=75&dpl=dpl_Ejtt9BCyCFNeRJdBoVsM9Es9x8xe)

        Pero espera un segundo, no agregaste ninguna regla CSS, ¿de dónde vienen los estilos?
        Si echas un vistazo al interior de global.css, notarás algunas directivas @tailwind:

        ```css
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
        ```

2. Usar Módulos, Tailwind y CSS.

    **Tailwind CSS**

    - Tailwind es un marco CSS que acelera el proceso de desarrollo al permitirle escribir rápidamente  clases de utilidad directamente en su marcado JSX. En Tailwind, puedes diseñar elementos agregando nombres de clases.
    
    - Aunque los estilos CSS se comparten globalmente, cada clase se aplica de forma singular a cada elemento. Esto significa que si agrega o elimina un elemento, no tiene que preocuparse por mantener hojas de estilo separadas, colisiones de estilos o que el tamaño de su paquete CSS crezca a medida que su aplicación escala.

    - Cuando usa create-next-app para iniciar un nuevo proyecto, Next.js le preguntará si desea usar Tailwind. Si selecciona Sí, Next.js instalará automáticamente los paquetes necesarios y configurará Tailwind en su aplicación.

    - ¡Juguemos con Tailwind! Copie el código siguiente y péguelo encima del elemento \<p\> en **/app/page.tsx:**

        ```tsx
        <div
        className="h-0 w-0 border-b-[30px] border-l-[20px] border-r-[20px] border-b-black border-l-transparent border-r-transparent"
        />
        ```
    
        > Deberías observar un triángulo negro encima del título la página

    **Module CSS**

    - Los módulos CSS le permiten aplicar CSS a un componente creando automáticamente nombres de clase únicos, por lo que no tiene que preocuparse también por las colisiones de estilos.

    - Continuaremos usando Tailwind en este curso, pero tomemos un momento para ver cómo puedes lograr los mismos resultados del cuestionario anterior usando módulos CSS. Dentro de **/app/ui**, cree un nuevo archivo llamado **home.module.css** y agregue las siguientes reglas CSS:

        ```css
        .shape {
        height: 0;
        width: 0;
        border-bottom: 30px solid black;
        border-left: 20px solid transparent;
        border-right: 20px solid transparent;
        }
        ```

    - Luego, dentro de su archivo **/app/page.tsx**, importe los estilos y reemplace los nombres de las clases de Tailwind del \<div\> que agregó con estilos.shape:
    

        ```tsx
        import styles from '@/app/ui/home.module.css';
    
        //...
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
            <div className={styles.shape}></div>;
        // ...
        ```
        
        > Guarde sus cambios y obtenga una vista previa de ellos en el navegador. Deberías ver la misma forma que antes.
        >
        > Los módulos Tailwind y CSS son las dos formas más comunes de diseñar aplicaciones Next.js. Usar uno u otro es una cuestión de preferencia: ¡incluso puedes usar ambos en la misma aplicación!


3. Usar el paquete de utilidades CLSX para clases condicionales.

    Puede haber casos en los que necesite aplicar un estilo condicional a un elemento según el estado o alguna otra condición.

    **clsx** es una biblioteca que te permite alternar nombres de clases fácilmente. Recomendamos echar un vistazo a la documentación para obtener más detalles, pero aquí está el uso básico:

    Supongamos que desea crear un componente **InvoiceStatus** que acepte el estado de la factura. El estado puede ser **pending** - "pendiente" o **paid** - "pagado".
    
    - Si es "pago", querrás que el color sea verde.
    - Si está "pendiente", querrás que el color sea gris.

        ```tsx
        import clsx from 'clsx';
        
        export default function InvoiceStatus({ status }: { status: string }) {
        return (
            <span
            className={clsx(
                'inline-flex items-center rounded-full px-2 py-1 text-sm',
                {
                'bg-gray-100 text-gray-500': status === 'pending',
                'bg-green-500 text-white': status === 'paid',
                },
            )}
            >
            // ...
        )}
        ```

        > Y así puedes usar clsx para aplicar condicionalmente las clases.


4. Otras soluciones para aplicar estilos, además de los enfoques analizados

    - Sass que te permite importar archivos .css y .scss.
    - Bibliotecas CSS-in-JS como styled-jsx, styled-components yemotion.
    - Eche un vistazo a la documentación de CSS para obtener más información.

---

## Optimización de fuentes e imágenes

En el capítulo anterior, aprendiste cómo diseñar tu aplicación Next.js. Sigamos trabajando en su página de inicio agregando una fuente personalizada y una imagen principal.


1. Agregamos fuentes personalizadas con `next/font`.

    - **¿Por qué optimizar las fuentes?**

    Las fuentes juegan un papel importante en el diseño de un sitio web, pero el uso de fuentes personalizadas en su proyecto puede afectar el rendimiento si es necesario buscar y cargar los archivos de fuentes.

    El cambio de diseño acumulativo o **Cumulative Layout Shift** es una métrica utilizada por Google para evaluar el rendimiento y la experiencia del usuario de un sitio web. Con las fuentes, el cambio de diseño ocurre cuando el navegador inicialmente muestra el texto en una fuente alternativa o del sistema y luego lo cambia por una fuente personalizada una vez que se ha cargado. Este intercambio puede hacer que el tamaño, el espaciado o el diseño del texto cambien, desplazando elementos a su alrededor.

    ![Cumulative Layout Shift](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Ffont-layout-shift.png&w=1920&q=75&dpl=dpl_Ejtt9BCyCFNeRJdBoVsM9Es9x8xe)

    Next.js optimiza automáticamente las fuentes en la aplicación cuando usa el módulo **next/font**. Descarga archivos de fuentes en el momento de la compilación y los aloja con sus otros activos estáticos. Esto significa que cuando un usuario visita su aplicación, no hay solicitudes de fuentes de red adicionales que afectarían el rendimiento.

    - **Agregar una fuente principal**

    ¡Agreguemos una fuente personalizada de Google a su aplicación para ver cómo funciona!

    En su carpeta **/app/ui**, cree un nuevo archivo llamado **fonts.ts**. Utilizará este archivo para conservar las fuentes que se utilizarán en toda su aplicación.

    Importe la fuente **Inter** del módulo **next/font/google**; esta será su fuente principal. Luego, especifica qué subconjunto deseas cargar. En este caso, 'latín'.

    ```tsx
    import { Inter } from 'next/font/google';
 
    export const inter = Inter({ subsets: ['latin'] });
    ```

    Finally, add the font to the \<body\> element in **/app/layout.tsx**:

    ```tsx
    import '@/app/ui/global.css';
    import { inter } from '@/app/ui/fonts';
    
    export default function RootLayout({
        children,
        }: {
        children: React.ReactNode;
        }) {
        return (
            <html lang="en">
            <body className={`${inter.className} antialiased`}>{children}</body>
            </html>
        );
    }
    ```
    > Al agregar Inter al elemento \<body\>, la fuente se aplicará en toda su aplicación. Aquí, también estás agregando la clase **antialiased** Tailwind que suaviza la fuente. No es necesario utilizar esta clase, pero añade un toque agradable.

    - ¡Ahora es tu turno! En su archivo fonts.ts, importe una fuente secundaria llamada Lusitana y pásela al elemento \<p\> en su archivo **/app/page.tsx**. Además de especificar un subconjunto como lo hizo antes, también deberá especificar el peso de la fuente.

        ```tsx
        // /app/ui/fonts.ts
        import { Inter, Lusitana } from 'next/font/google';
 
        export const inter = Inter({ subsets: ['latin'] });
        
        export const lusitana = Lusitana({
        weight: ['400', '700'],
        subsets: ['latin'],
        });

        // /app/page.tsx

        import AcmeLogo from '@/app/ui/acme-logo';
        import { ArrowRightIcon } from '@heroicons/react/24/outline';
        import { lusitana } from '@/app/ui/fonts';
        
        export default function Page() {
        return (
            // ...
            <p
            className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
            >
            <strong>Welcome to Acme.</strong> This is the example for the{' '}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
                Next.js Learn Course
            </a>
            , brought to you by Vercel.
            </p>
            // ...
        );
        }
        ```

        > Finally, the <AcmeLogo /> component also uses Lusitana. It was commented out to prevent errors, you can now uncomment it:

        ```tsx
        // ...
 
        export default function Page() {
        return (
            <main className="flex min-h-screen flex-col p-6">
            <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
                <AcmeLogo />
                {/* ... */}
            </div>
            </main>
        );
        }
        ```


2. Agregamos imágenes con `next/image`.

    - **¿Por qué optimizar imágenes?**
    Next.js puede ofrecer recursos estáticos, como imágenes, en la carpeta /public de nivel superior. Se puede hacer referencia a los archivos dentro de /public en su aplicación.

    Si miras dentro de la carpeta /public, verás que hay dos imágenes: **hero-desktop.png** y **hero-mobile.png**. Estas dos imágenes son completamente diferentes y se mostrarán dependiendo de si el dispositivo del usuario es de escritorio o móvil.

    Con HTML normal, agregaría una imagen de la siguiente manera:

    ```html
    <img
    src="/hero.png"
    alt="Screenshots of the dashboard project showing desktop and mobile versions"
    />
    ```

    Sin embargo, esto significa que tienes que hacer manualmente lo siguiente:

    - Asegúrese de que su imagen responda en diferentes tamaños de pantalla.
    - Especifique tamaños de imagen para diferentes dispositivos.
    - Evite cambios de diseño a medida que se cargan las imágenes.
    - Carga diferida de imágenes que están fuera de la ventana gráfica del usuario.
    - La optimización de imágenes es un tema amplio en el desarrollo web que podría considerarse una especialización en sí misma. En lugar de implementar manualmente estas optimizaciones, puede utilizar el componente `next/image` para optimizar automáticamente sus imágenes.

    **El componente \<Imagen\>**

    El componente \<Imagen\> es una extensión de la etiqueta HTML \<img\> y viene con optimización automática de la imagen, como por ejemplo:

    - Evitar el cambio de diseño automáticamente cuando se cargan las imágenes.
    - Cambiar el tamaño de las imágenes para evitar enviar imágenes grandes a dispositivos con una ventana gráfica más pequeña.
    - Carga diferida de imágenes de forma predeterminada (las imágenes se cargan a medida que ingresan a la ventana gráfica).
    - Ofrecer imágenes en formatos modernos, como WebP y AVIF, cuando el navegador lo admite.

    **Agregar la imagen principal del escritorio**

    - Usemos el componente \<Imagen\>.

    En su archivo **/app/page.tsx**, importe el componente de la `next/image`. Luego, agregue la imagen debajo del comentario:

    ```tsx
    // /app/page.tsx
    import AcmeLogo from '@/app/ui/acme-logo';
    import { lusitana } from '@/app/ui/fonts';
    import Image from 'next/image';
    
    export default function Page() {
    return (
        // ...
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
        {/* Add Hero Images Here */}
        <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop and mobile versions"
        />
        </div>
        //...
    );
    }
    ```

    Aquí, estás configurando el ancho en 1000 y el alto en 760 píxeles. Es una buena práctica establecer el ancho y el alto de las imágenes para evitar cambios en el diseño; estas deben tener una relación de aspecto idéntica a la imagen de origen.

    También notarás la clase oculta para eliminar la imagen del DOM en pantallas móviles y md:block para mostrar la imagen en pantallas de escritorio.

    Así es como debería verse su página de inicio ahora:

    ![Página principal con Imagen Optimizada](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Fhome-page-with-hero.png&w=1080&q=75&dpl=dpl_Ejtt9BCyCFNeRJdBoVsM9Es9x8xe)

    - Agregar la imagen principal del móvil

    ¡Ahora es tu turno! Debajo de la imagen que acaba de agregar, agregue otro componente \<Imagen\> para mobile-hero.png.

    La imagen debe tener un ancho de 560 y un alto de 620 píxeles.
    Debe mostrarse en las pantallas de los móviles y ocultarse en el escritorio; puede utilizar herramientas de desarrollo para comprobar si las imágenes del escritorio y del móvil se intercambian correctamente.

    ```tsx
    <Image
        src="/hero-mobile.png"
        width={560}
        height={620}
        className="block md:hidden"
        alt="Screenshot of the dashboard project showing mobile version"
    />
    ```

    > ¡Excelente! Su página de inicio ahora tiene una fuente personalizada e imágenes destacadas.

### Lectura recomendada

Hay mucho más que aprender sobre estos temas, incluida la optimización de imágenes remotas y el uso de archivos de fuentes locales. Si desea profundizar en fuentes e imágenes, consulte:

- [Image Optimization Docs](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Font Optimization Docs](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [Improving Web Performance with Images (MDN)](https://developer.mozilla.org/en-US/docs/Learn/Performance/Multimedia)
- [Web Fonts (MDN)](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Web_fonts)


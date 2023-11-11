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
- [**Enrutamiento:**](#crear-diseños-y-páginas) cómo crear diseños y páginas anidados utilizando el enrutamiento del sistema de archivos.
- [**Obtención de datos:**](#configurando-su-base-de-datos) cómo configurar una base de datos en Vercel y mejores prácticas para la obtención y transmisión por secuencias.
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

---

## Crear diseños y páginas

Hasta el momento, tu aplicación sólo tiene una página de inicio. Aprendamos cómo puede crear más rutas con diseños y páginas.

Estos son los temas y acciones que cubriremos:

- Crear las rutas del panel utilizando el enrutamiento del sistema de archivos.

- Comprender la función de las carpetas y archivos al crear nuevos segmentos de ruta.

- Crear un diseño anidado que se pueda compartir entre varias páginas del panel.

- Comprender qué son la colocación, el renderizado parcial y el diseño raíz - Root Layout.

### Enrutamiento anidado

Next.js utiliza enrutamiento del sistema de archivos donde se usan carpetas para crear rutas anidadas. Cada carpeta representa un segmento de ruta que se asigna a un segmento de URL.

![Enrutamiento anidado](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Ffolders-to-url-segments.png&w=1920&q=75&dpl=dpl_Ejtt9BCyCFNeRJdBoVsM9Es9x8xe)

Puede crear interfaces de usuario independientes para cada ruta utilizando los archivos `layout.tsx` y `page.tsx`.

`page.tsx` es un archivo Next.js especial que exporta un componente de **React** y es necesario para que la ruta sea accesible. En su aplicación, ya tiene un archivo de página: **/app/page.tsx**: esta es la página de inicio asociada con la ruta **/.** la página principal de la app.

Para crear una ruta anidada, puede anidar carpetas una dentro de otra y agregar archivos page.tsx dentro de ellas. Por ejemplo:

![Creación de una ruta anidada](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Fdashboard-route.png&w=1920&q=75&dpl=dpl_Ejtt9BCyCFNeRJdBoVsM9Es9x8xe)

### Creando la página del dashboard

Cree una nueva carpeta llamada dashboard dentro de **/app.** Luego, cree un nuevo archivo `page.tsx` dentro de la carpeta del panel con el siguiente contenido:
> /app/dashboard/page.tsx
```tsx
export default function Page() {
  return <p>Dashboard Page</p>;
}
```

- Práctica: **Crear las páginas del panel**

**Página de clientes:** se debe poder acceder a la página en http://localhost:3000/dashboard/customers. Por ahora, debería devolver un elemento `<p>Página de clientes</p>`.

**Página de facturas:** se debe poder acceder a la página de facturas en http://localhost:3000/dashboard/invoices. Por ahora, también devuelve un elemento `<p>Página de facturas</p>`.

Deberías tener la siguiente estructura de carpetas:

![Estructura de carpetas](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Frouting-solution.png&w=1920&q=75&dpl=dpl_Ejtt9BCyCFNeRJdBoVsM9Es9x8xe)

### Creando el diseño del dashboard

Los paneles tienen algún tipo de navegación que se comparte en varias páginas. En Next.js, puede utilizar un archivo layout.tsx especial para crear una interfaz de usuario que se comparte entre varias páginas. 

- ¡Creemos un diseño para las páginas del panel!: Dentro de la carpeta **/dashboard**, agregue un nuevo archivo llamado `layout.tsx` y pegue el siguiente código:

    ```tsx
    import SideNav from '@/app/ui/dashboard/sidenav';
 
    export default function Layout({ children }: { children: React.ReactNode }) {
        return (
            <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <SideNav />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
            </div>
        );
    }
    ```

    En este código suceden algunas cosas, así que analicémoslas:

    Primero, está importando el componente \<SideNav /\> a su diseño. Cualquier componente que importe a este archivo formará parte del diseño.

    El componente \<Layout /\> recibe propiedades `{children}`. Este hijo puede ser una página u otro diseño. En su caso, las páginas dentro de /dashboard se anidarán automáticamente dentro del \<Layout /\> así:

    ![Ejemplo de anidamiento del diseño](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Fshared-layout.png&w=1920&q=75&dpl=dpl_Ejtt9BCyCFNeRJdBoVsM9Es9x8xe)


    Un beneficio de usar diseños en Next.js es que durante la navegación, solo se actualizan los componentes de la página, mientras que el diseño no se vuelve a representar. Esto se llama **renderizado parcial**:

    ![Renderizado parcial o Patial rendering](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Fpartial-rendering-dashboard.png&w=1920&q=75&dpl=dpl_Ejtt9BCyCFNeRJdBoVsM9Es9x8xe)


### Diseño Raiz ./app/layout.tsx

Esto se llama diseño raíz y es obligatorio. Cualquier interfaz de usuario que agregue al diseño raíz se compartirá en todas las páginas de su aplicación. Puede utilizar el diseño raíz para modificar sus etiquetas \<html\> y \<body\> y agregar **metadatos** (aprenderá más sobre los metadatos en un capítulo posterior).

Dado que el nuevo diseño que acaba de crear `/app/dashboard/layout.tsx` es exclusivo de las páginas del panel, no necesita agregar ninguna interfaz de usuario al diseño raíz anterior.


### Navegando entre páginas

En el capítulo anterior, creó el diseño y las páginas del panel. Ahora, agreguemos algunos enlaces para permitir a los usuarios navegar entre las rutas del panel.

- **¿Por qué optimizar la navegación?**

Para vincular páginas, tradicionalmente se utiliza el elemento HTML \<a\>. Por el momento, los enlaces de la barra lateral utilizan elementos \<a\>, pero observe lo que sucede cuando navega entre las páginas de inicio, facturas y clientes en su navegador. ¿Lo viste? ¡Hay una actualización de página completa en cada navegación de página!

- **Cómo utilizar el componente** `next/link`.

En Next.js, puede utilizar el componente \<Link /\> para vincular páginas en su aplicación. \<Link\> le permite realizar navegación del lado del cliente con JavaScript.

Para usar el componente \<Link /\>, abra `/app/ui/dashboard/nav-links.tsx` e importe el componente Link desde next/link. Luego reemplace la etiqueta \<a\> con \<Link\>.

Guarde sus cambios y verifique si funciona en su host local. Ahora debería poder navegar entre las páginas sin ver una actualización completa. Aunque partes de su aplicación se procesan en el servidor, no se actualiza la página completa, lo que la hace sentir como una aplicación web.

- **Cómo funciona la navegación en Next.js**

**División automática de código y captación previa - Code-Splitting and Prefetching**

Para mejorar la experiencia de navegación, el código de Next.js divide automáticamente su aplicación por segmentos de ruta. Esto es diferente de un React SPA tradicional, donde el navegador carga todo el código de su aplicación en la carga inicial.

Dividir el código por rutas significa que las páginas quedan aisladas. Si una determinada página arroja un error, el resto de la aplicación seguirá funcionando.

Además, en producción, cada vez que aparecen componentes \<Link\> en la ventana gráfica del navegador, Next.js busca automáticamente el código para la ruta vinculada en segundo plano. Cuando el usuario hace clic en el enlace, el código de la página de destino ya estará cargado en segundo plano, ¡y esto es lo que hace que la transición de la página sea casi instantánea!

- **Cómo mostrar un enlace activo con el gancho usePathname()**

Un patrón de interfaz de usuario común es mostrar un enlace activo para indicar al usuario en qué página se encuentra actualmente. Para hacer esto, necesita obtener la ruta actual del usuario desde la URL. Next.js proporciona un gancho llamado `usePathname()` que puede usar para verificar la ruta e implementar este patrón.

Dado que `usePathname()` es un enlace, deberá convertir `nav-links.tsx` en un componente de cliente. Agregue la directiva `"usar cliente"` de React al principio del archivo, luego importe `usePathname()` desde `next/navigation` y a continuación, asigne la ruta a una variable llamada nombre de ruta dentro de su componente `<NavLinks />`, por ultimo utilice la librería clsx para aplicar condicionalmente clases y darle estilo, cuando `link.href` coincide con el nombre de la ruta, el enlace debería mostrarse con texto azul y un fondo azul claro:

```tsx
'use client';
 
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
 
// ...
 
export default function NavLinks() {
  const pathname = usePathname();
 
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
```

---

## Configurando su base de datos

¡Creemos una base de datos para comenzar a buscar datos reales!

Antes de poder continuar trabajando en su panel, necesitará algunos datos. En este capítulo, configurará una base de datos PostgreSQL usando @vercel/postgres. Si ya está familiarizado con PostgreSQL y prefiere utilizar su propio proveedor, puede omitir este capítulo y configurarlo usted mismo. De lo contrario, ¡continuemos!

- Envía tu proyecto a GitHub.

A continuación te muestro como crear un repositorio local y sincronizarlo con GitHub

```bash
git init # inicializa el repositorio.

git add . # añade todos los archivos excepto los excluidos por .gitignore al stage.

git commit -m "MENSAJE_DEL_COMMIT" # confirma los cambios con un mensaje descriptivo.

git branch -M main # pasamos a una rama main si es necesario por convención ya no se usa master

git remote add origin https://github.com/"NOMBRE_USUARIO"/"NOMBRE_PROYECTO".git # vinculamos al remoto

git push -u origin main # subimos los cambios a github, sincronizando los datos
```

- Configure una cuenta de Vercel y vincule su repositorio de GitHub para obtener vistas previas e implementaciones instantáneas.

![Conexión de Vercel con el repositorio de Github](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Fimport-git-repo.png&w=1080&q=75&dpl=dpl_3KvQ7chUpCwD5geTFxau9SMj51uW)

> Nombre el proyecto y haga el Deploy.

¡Felicidades! 🎉 Su proyecto ya está implementado.

- Cree y vincule su proyecto a una base de datos de Postgres.

Para configurar una base de datos, haga clic en Continuar al panel y seleccione la pestaña Almacenamiento en el panel de su proyecto. Seleccione **Connect Store → Crear nuevo → Postgres → Continuar.**

Una vez conectado, navegue hasta la pestaña .env.local, haga clic en Mostrar secreto y copiar fragmento.

![Variables de entorno de la Base de Datos Postgres](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Fdatabase-dashboard.png&w=1080&q=75&dpl=dpl_3KvQ7chUpCwD5geTFxau9SMj51uW)

- Sembrar la base de datos con datos iniciales.

Ahora que se ha creado su base de datos, vamos a sembrarla con algunos datos iniciales. Esto le permitirá tener algunos datos con los que trabajar mientras crea el panel.

En la carpeta /scripts de su proyecto, hay un archivo llamado seed.js. Este script contiene las instrucciones para crear y generar las facturas, los clientes, los usuarios y las tablas de ingresos.

No se preocupe si no comprende todo lo que hace el código, pero para brindarle una descripción general, el script usa SQL para crear las tablas y toma los datos del archivo placeholder-data.js para completarlas después de que hayan sido creado.

A continuación, en su archivo package.json, agregue la siguiente línea a sus scripts:

```json
"scripts": {
  "build": "next build",
  "dev": "next dev",
  "start": "next start",
  "seed": "node -r dotenv/config ./scripts/seed.js"
},
```

Ahora, ejecute `npm run seed`. Debería ver algunos mensajes de console.log en su terminal para informarle que el script se está ejecutando.

Puede explorar la base de datos y sus tablas en Vercel en Data > Browse, y ejecutar consultas en Data > Query. Esta sección admite comandos SQL estándar. Por ejemplo, al ingresar clientes DROP TABLE se eliminará la tabla "clientes" junto con todos sus datos, ¡así que tenga cuidado!

Ejecutemos su primera consulta de base de datos. Pegue y ejecute el siguiente código SQL en la interfaz de Vercel:

```sql
SELECT invoices.amount, customers.name
FROM invoices
JOIN customers ON invoices.customer_id = customers.id
WHERE invoices.amount = 666;
```
> La factura pertenece al cliente Evil Rabbit

---

# Recuperacion de datos

Analicemos las diferentes formas en que puede recuperar datos de su base de datos, incluido el uso de API, SQL y alternativas.

Ahora que ha creado y sembrado su base de datos, analicemos las diferentes formas en que puede obtener datos para su aplicación y elijamos la más adecuada para la página de descripción general del panel.

Temas que veremos en esta sección:

- Conozca algunos enfoques para recuperar datos: API, ORM, SQL, etc.

- Cómo los componentes del servidor nos ayudan a acceder a nuestros recursos de back-end de forma más segura.

- Qué son las cascadas de red.

- Cómo implementar la recuperación de datos en paralelo utilizando un patrón de JavaScript.

### Elegir cómo recuperar datos

- **Capa API**: Las **API** son una capa intermediaria entre el código de su aplicación y la base de datos. Hay algunos casos en los que podría utilizar una API:

    - Si está utilizando servicios de terceros que proporcionan una API.
    - Si está obteniendo datos del cliente, querrá tener una capa API que se ejecute en el servidor para evitar exponer los secretos de su base de datos al cliente.
    - En Next.js, puede crear puntos finales de API utilizando controladores de ruta.

- **Consultas de bases de datos**: Cuando crea una aplicación de pila completa, también necesitará escribir lógica para interactuar con su base de datos. Para bases de datos relacionales como Postgres, puede hacer esto con SQL o un ORM como Prisma. Hay algunos casos en los que es necesario escribir consultas a la base de datos:

    - Al crear sus puntos finales de API, necesita escribir lógica para interactuar con su base de datos.
    - Si está utilizando componentes de servidor React (obteniendo datos en el servidor), puede omitir la capa API y consultar su base de datos directamente sin correr el riesgo de exponer los secretos de su base de datos al cliente.


En la siguiente sección, exploraremos cómo puede recuperar datos utilizando un enfoque relativamente nuevo: componentes asíncronos de React Server.

**Uso de componentes del servidor para recuperar datos**
De forma predeterminada, las aplicaciones Next.js usan componentes de servidor React y usted puede optar por componentes de cliente cuando sea necesario. Existen algunos beneficios al recuperar datos con los componentes de React Server:

Los componentes del servidor se ejecutan en el servidor, por lo que puede mantener costosas recuperaciones de datos y lógica en el servidor y solo enviar el resultado al cliente.
Los componentes del servidor respaldan las promesas y brindan una solución más simple para tareas asincrónicas como la recuperación de datos. Puede utilizar la sintaxis async/await sin recurrir a las bibliotecas useEffect, useState o de recuperación de datos.
Dado que los componentes del servidor se ejecutan en el servidor, puede consultar la base de datos directamente sin una capa API adicional.

### Usando SQL

Para nuestro proyecto, escribirá consultas de bases de datos utilizando el SDK de Vercel Postgres y SQL. Hay algunas razones por las que usaremos SQL:

SQL es el estándar de la industria para consultar bases de datos relacionales (por ejemplo, los ORM generan SQL internamente).
Tener un conocimiento básico de SQL puede ayudarle a comprender los fundamentos de las bases de datos relacionales, lo que le permitirá aplicar sus conocimientos a otras herramientas.
SQL es versátil y le permite recuperar y manipular datos específicos.
El SDK de Vercel Postgres proporciona protección contra inyecciones de SQL.

Vaya a `/app/lib/data.ts`, aquí verá que estamos importando la función sql desde @vercel/postgres. Esta función le permite consultar su base de datos:

```ts
import { sql } from '@vercel/postgres';
 
// ...
```

Puede llamar a sql dentro de cualquier componente del servidor. Pero para permitirle navegar por los componentes más fácilmente, hemos mantenido todas las consultas de datos en el archivo data.ts y puede importarlas a los componentes.

### Obteniendo datos para la página de descripción general del panel

Ahora que comprende las diferentes formas de obtener datos, obtengamos datos para la página de descripción general del panel. Navegue hasta `/app/dashboard/page.tsx`, pegue el siguiente código y dedique un tiempo a explorarlo:

```tsx
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
 
export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* <Card title="Collected" value={totalPaidInvoices} type="collected" /> */}
        {/* <Card title="Pending" value={totalPendingInvoices} type="pending" /> */}
        {/* <Card title="Total Invoices" value={numberOfInvoices} type="invoices" /> */}
        {/* <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* <RevenueChart revenue={revenue}  /> */}
        {/* <LatestInvoices latestInvoices={latestInvoices} /> */}
      </div>
    </main>
  );
}
```

La página es un componente asíncrono. Esto le permite utilizar await para recuperar datos.
También hay 3 componentes que reciben datos: `<Card>, <RevenueChart> y <LatestInvoices>`. Actualmente están comentados para evitar que la aplicación produzca errores.

### Obteniendo datos para `<RevenueChart/>`

Para recuperar datos para el componente `<RevenueChart/>`, importe la función fetchRevenue desde `data.ts` y llámela dentro de su componente:

```tsx
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue } from '@/app/lib/data';
 
export default async function Page() {
  const revenue = await fetchRevenue();
  // ...
}
```

Luego, descomente el componente `<RevenueChart/>` y cualquier cosa dentro de la función `RevenueChart()`. Verifique su localhost, ahora está utilizando los datos de ingresos en su componente.

![Obteniendo datos, gráfico de ingresos](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Frecent-revenue.png&w=1080&q=75&dpl=dpl_3KvQ7chUpCwD5geTFxau9SMj51uW)

### Obteniendo datos para `<LatestInvoices/>`

Para el componente `<LatestInvoices />`, necesitamos obtener las últimas 5 facturas, ordenadas por fecha.

Puede buscar todas las facturas y ordenarlas usando JavaScript. Esto no es un problema ya que nuestros datos son pequeños, pero a medida que su aplicación crece, puede aumentar significativamente la cantidad de datos transferidos en cada solicitud y el JavaScript necesario para clasificarlos.

En lugar de ordenar las últimas facturas en la memoria, puede utilizar una consulta SQL para recuperar solo las últimas 5 facturas. Por ejemplo, esta es la consulta SQL de su archivo `data.ts`:

```tsx
// Fetch the last 5 invoices, sorted by date
const data = await sql<LatestInvoiceRaw>`
  SELECT invoices.amount, customers.name, customers.image_url, customers.email
  FROM invoices
  JOIN customers ON invoices.customer_id = customers.id
  ORDER BY invoices.date DESC
  LIMIT 5`;
```

Ahora en su página, importe la función fetchLatestInvoices:

Luego, descomente el componente `<LatestInvoices />`.

Si visita su servidor local, debería ver que solo se devuelven los últimos 5 de la base de datos. ¡Con suerte, estás empezando a ver las ventajas de consultar tu base de datos directamente!

![Gráfico de ingresos y últimas 5 facturas](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Flatest-invoices.png&w=1080&q=75&dpl=dpl_3KvQ7chUpCwD5geTFxau9SMj51uW)

### Práctica: Obtener datos para los componentes `<Card>`

Ahora es tu turno de recuperar datos para los componentes `<Card>`. Las tarjetas mostrarán los siguientes datos:

- Importe total de facturas cobradas.
- Importe total de facturas pendientes.
- Número total de facturas.
- Número total de clientes.

Nuevamente, podría verse tentado a recuperar todas las facturas y clientes y utilizar JavaScript para manipular los datos. Por ejemplo, podría utilizar Array.length para obtener el número total de facturas y clientes.
Pero con SQL, sólo puedes recuperar los datos que necesitas. Es un poco más largo que usar Array.length, pero significa que es necesario transferir menos datos durante la solicitud. Esta es la alternativa SQL:

```ts
const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
```

Solución:

La función que necesitará importar se llama `fetchCardData`. Necesitará desestructurar los valores devueltos por la función.

```tsx
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import {
  fetchRevenue,
  fetchLatestInvoices,
  fetchCardData,
} from '@/app/lib/data';
 
export default async function Page() {
  const revenue = await fetchRevenue();
  const latestInvoices = await fetchLatestInvoices();
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();
 
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue} />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
```

¡Excelente! Ahora ha obtenido todos los datos para la página de descripción general del panel. Tu página debería verse así:

![Página principal del panel con sus gráficos](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Fcomplete-dashboard.png&w=1080&q=75&dpl=dpl_3KvQ7chUpCwD5geTFxau9SMj51uW)

Sin embargo... hay dos cosas que debes tener en cuenta:

Las solicitudes de datos se bloquean entre sí sin querer, creando una **cascada de solicitudes**.
De forma predeterminada, Next.js prerenderiza rutas para mejorar el rendimiento, esto se denomina renderizado estático. Entonces, si sus datos cambian, no se reflejarán en su panel.

Analicemos el número 1 en este capítulo y luego analicemos en detalle el número 2 en el siguiente capítulo.

- **¿Qué son las cascadas de solicitudes?**

Una "cascada" se refiere a una secuencia de solicitudes de red que dependen de la finalización de solicitudes anteriores. En el caso de la recuperación de datos, cada solicitud solo puede comenzar una vez que la solicitud anterior haya devuelto los datos.

![Representación gráfica de las diferencias entre solicitudes Secuenciales y Paralelas](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Fsequential-parallel-data-fetching.png&w=1920&q=75&dpl=dpl_3KvQ7chUpCwD5geTFxau9SMj51uW)

Por ejemplo, debemos esperar a que se ejecute `fetchRevenue()` antes de que `fetchLatestInvoices()` pueda comenzar a ejecutarse, y así sucesivamente.

Este patrón no es necesariamente malo. Puede haber casos en los que desee cascadas porque desea que se cumpla una condición antes de realizar la siguiente solicitud. Por ejemplo, es posible que desee obtener primero el ID de un usuario y la información del perfil. Una vez que tengas la identificación, puedes proceder a buscar su lista de amigos. En este caso, cada solicitud depende de los datos devueltos por la solicitud anterior.

Sin embargo, este comportamiento puedo no ser necesario y afectar el rendimiento.

### Obtención de datos en paralelo

Una forma común de evitar cascadas es iniciar todas las solicitudes de datos al mismo tiempo, en paralelo.

En JavaScript, puede utilizar las funciones `Promise.all()` o `Promise.allSettled()` para iniciar todas las promesas al mismo tiempo. Por ejemplo, en `data.ts`, usamos `Promise.all()` en la función `fetchCardData()`:

```tsx
export async function fetchCardData() {
  try {
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;
 
    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);
    // ...
  }
}
```

> Con Promise.allSettled(), también puede devolver una matriz de objetos con claves de estado y valor, de modo que pueda verificar que el estado de una promesa se cumpla o se rechace antes de pasar el valor a su componente. Es útil si desea manejar los errores con mayor elegancia.

Al usar este patrón, puedes:

Comenzar a ejecutar todas las recuperaciones de datos al mismo tiempo, lo que puede generar mejoras en el rendimiento.

Sin embargo, existe una desventaja al utilizar este patrón de JavaScript: ¿qué sucede si una solicitud de datos es más lenta que todas las demás?


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
- [**Renderizado estatico y dinámico:**](#representación-estática-y-dinámica) qué es el renderizado estático y cómo puede mejorar el rendimiento de su aplicación y qué es el renderizado dinámico y como usarlo.
- [**Streaming**](#streaming) qué es el streaming y cuándo puedes utilizarlo con loading, Suspense y esqueletos de carga.
- [**Búsqueda y paginación:**](#agregar-búsqueda-y-paginación) cómo implementar la búsqueda y paginación utilizando parámetros de búsqueda de URL.
- [**Mutación de datos:**](#mutación-de-datos) cómo mutar datos usando React Server Actions y revalidar el caché de Next.js.
- [**Manejo de errores:**](#manejo-de-errores) cómo manejar errores generales y 404 no encontrados.
- [**Validación y accesibilidad de formularios:**](#mejora-de-la-accesibilidad) cómo realizar la validación de formularios del lado del servidor y consejos para mejorar la accesibilidad.
- [**Autenticación:**](#agregar-autenticación) cómo agregar autenticación a su aplicación usando NextAuth.js y Middleware.
- [**Metadatos:**](#agregar-metadatos) cómo agregar metadatos y preparar su aplicación para compartir en redes sociales.

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

---

## Representación estática y dinámica

Obtenga información sobre cómo puede utilizar para optimizar aún más la obtención de datos con PPR y Streaming.

Este capítulo contiene funciones experimentales de Next.js 14 que están sujetas a cambios. El contenido puede actualizarse a medida que se finalicen las funciones.

En el capítulo anterior, obtuvo datos para la página Descripción general del panel. Sin embargo, analizamos brevemente dos limitaciones de la configuración actual:

- Las solicitudes de datos están creando una cascada involuntaria.
- El panel es estático, por lo que las actualizaciones de datos no se reflejarán en su aplicación.

Estos son los temas que cubriremos:

- Qué es el renderizado estático y cómo puede mejorar el rendimiento de su aplicación.

- Qué es el renderizado dinámico y cuándo usarlo.

- Diferentes enfoques para hacer que su tablero sea dinámico.

- La limitación de recuperar datos en el momento de la solicitud.

### ¿Qué es el renderizado estático?

Con la representación estática, la obtención y representación de datos se realiza en el servidor en el momento de la compilación (cuando se implementa) o durante la revalidación. Luego, el resultado se puede distribuir y almacenar en caché (stored) en una red de entrega de contenido (Content Delivery Network (CDN)).

![Cached vs Uncached](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Fstatic-site-generation.png&w=1920&q=75&dpl=dpl_8mqvTcfbhtdnPWFJCvFr8naAHAAq)

Cada vez que un usuario visita su aplicación, se muestra el resultado almacenado en caché. Hay un par de beneficios del renderizado estático:

- **Sitios web más rápidos:** el contenido prerenderizado se puede almacenar en caché. Esto garantiza que los usuarios de todo el mundo puedan acceder al contenido de su sitio web de forma más rápida y fiable.
- **Carga reducida del servidor:** debido a que el contenido se almacena en caché, su servidor no tiene que generar contenido dinámicamente para cada solicitud de usuario.
- **SEO:** el contenido prerenderizado es más fácil de indexar para los rastreadores de los motores de búsqueda, ya que el contenido ya está disponible cuando se carga la página. Esto puede conducir a una mejor clasificación en los motores de búsqueda.

La representación estática es útil para la interfaz de usuario sin datos o datos que se comparten entre usuarios, como una publicación de blog estática o una página de producto. Puede que no sea una buena opción para un panel que tenga datos que se actualicen periódicamente.

Lo opuesto al **renderizado estático** es el **renderizado dinámico**.

### ¿Qué es el renderizado dinámico?

Con la representación dinámica, el contenido se presenta en el servidor para cada usuario en el momento de la solicitud (cuando el usuario visita la página). Hay un par de beneficios del renderizado dinámico:

- **Datos en tiempo real:** la representación dinámica permite que su aplicación muestre datos en tiempo real o actualizados con frecuencia. Esto es ideal para aplicaciones donde los datos cambian con frecuencia.

- **Contenido específico del usuario:** es más fácil ofrecer contenido específico del usuario, como paneles personalizados o perfiles de usuario, a través de la representación dinámica, ya que los datos se actualizan en función de la interacción del usuario.

- **Solicitar información sobre el tiempo:** la representación dinámica le permite acceder a información que solo se puede conocer en el momento de la solicitud, como las cookies o los parámetros de búsqueda de URL.

## Como Dinamizar nuestro tablero

De forma predeterminada, `@vercel/postgres` no establece su propia semántica de almacenamiento en caché. Esto permite que el marco establezca su propio comportamiento estático y dinámico.

Puede utilizar una API de Next.js llamada unstable_noStore dentro de los componentes de su servidor o funciones de recuperación de datos para optar por no participar en la representación estática. Agreguemos esto.

En su `data.ts`, importe `unstable_noStore` desde `next/cache` y llámelo la parte superior de sus funciones de obtención de datos:

```ts
// ...
import { unstable_noStore as noStore } from 'next/cache';
 
export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
 
  // ...
}
 
export async function fetchLatestInvoices() {
  noStore();
  // ...
}
 
export async function fetchCardData() {
  noStore();
  // ...
}
 
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  noStore();
  // ...
}
 
export async function fetchInvoicesPages(query: string) {
  noStore();
  // ...
}
 
export async function fetchFilteredCustomers(query: string) {
  noStore();
  // ...
}
 
export async function fetchInvoiceById(query: string) {
  noStore();
  // ...
}
```

> Nota: `unstable_noStore` es una API experimental y puede cambiar en el futuro. Si prefiere utilizar una API estable en sus propios proyectos, también puede utilizar la opción de configuración de segmento `export constdynamic = "force-dynamic"`.

**Simular una recuperación de datos lenta**

Hacer que el tablero sea dinámico es un buen primer paso. Sin embargo... todavía hay un problema que mencionamos en el capítulo anterior. ¿Qué sucede si una solicitud de datos es más lenta que todas las demás?

Simulemos una recuperación lenta de datos para ver qué sucede. En su archivo `data.ts`, descomente el archivo console.log y setTimeout dentro de `fetchRevenue()`:

```ts
export async function fetchRevenue() {
  try {
    // We artificially delay a response for demo purposes.
    // Don't do this in a real application
    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));
 
    const data = await sql<Revenue>`SELECT * FROM revenue`;
 
    console.log('Data fetch complete after 3 seconds.');
 
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}
```

Aquí, ha agregado un retraso artificial de 3 segundos para simular una recuperación de datos lenta. El resultado es que ahora toda su página está bloqueada mientras se recuperan los datos.

Diagrama que muestra toda la página bloqueada para su procesamiento mientras se obtienen datos
Lo que nos lleva a un desafío común que los desarrolladores deben resolver:

Con el renderizado dinámico, su aplicación es tan rápida como su recuperación de datos más lenta.

---

## Streaming

Aprenda cómo mejorar la experiencia de su usuario agregando streaming.

En el capítulo anterior, dinamizó la página del panel; sin embargo, analizamos cómo las recuperaciones lentas de datos pueden afectar el rendimiento de su aplicación. Veamos cómo puede mejorar la experiencia del usuario cuando hay solicitudes de datos lentas.


Estos son los temas que cubriremos

- Qué es el streaming y cuándo puedes utilizarlo.

- Cómo implementar streaming con `loading.tsx` y `Suspense`.

- Qué son los esqueletos de carga.

- Qué son los **grupos de rutas** y cuándo puedes utilizarlos.

- Dónde colocar límites de suspenso en su aplicación.

**¿Qué es el streaming?**

La transmisión por secuencias es una técnica de transferencia de datos que le permite dividir una ruta en "fragmentos" más pequeños y transmitirlos progresivamente desde el servidor al cliente a medida que estén listos.

![Diagrama de recuperación secuencial vs paralelo](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Fserver-rendering-with-streaming.png&w=1920&q=75&dpl=dpl_8mqvTcfbhtdnPWFJCvFr8naAHAAq)

Diagrama que muestra el tiempo con recuperación de datos secuencial y recuperación de datos en paralelo
Al transmitir, puede evitar que las solicitudes de datos lentas bloqueen toda su página. Esto permite al usuario ver e interactuar con partes de la página sin esperar a que se carguen todos los datos antes de poder mostrarle cualquier interfaz de usuario.

La obtención y representación de datos se inician en paralelo, por lo que el usuario puede ver la interfaz de usuario cuando esté lista. Esto es diferente del enfoque tradicional en cascada, donde la obtención y el procesamiento de datos se inician secuencialmente, bloqueando el procesamiento de la interfaz de usuario hasta que todos los datos estén listos.

![Streaming de componentes en paralelo](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Fserver-rendering-with-streaming-chart.png&w=1920&q=75&dpl=dpl_8mqvTcfbhtdnPWFJCvFr8naAHAAq)

La transmisión funciona bien con el modelo de componentes de React, ya que cada componente puede considerarse un fragmento.

**Hay dos formas de implementar la transmisión en Next.js:**

1. ### A nivel de página, con el archivo `loading.tsx`.

Transmitir una página completa con `loading.tsx`
En la carpeta **/app/dashboard**, cree un nuevo archivo llamado `loading.tsx`:

```tsx
export default function Loading() {
  return <div>Loading...</div>;
}
```

Algunas cosas están sucediendo aquí:

1. `loading.tsx` es un archivo especial Next.js creado sobre Suspense, que le permite crear una interfaz de usuario de carga para mostrarla como reemplazo mientras se carga el contenido de la página.

2. Dado que `<Sidebar> `es estático, se muestra inmediatamente. El usuario puede interactuar con `<Sidebar> ` mientras se carga el contenido dinámico.

3. El usuario no tiene que esperar a que la página termine de cargarse antes de navegar (esto se llama navegación interrumpible).

**¡Felicidades! ¡Acabas de implementar Streaming con Next.js!**

Pero podemos hacer más para mejorar la experiencia del usuario. Mostremos un esqueleto en lugar del texto Cargando….

**Agregar esqueletos de carga**

Un esqueleto de carga es una versión simplificada de la interfaz de usuario. Muchos sitios web los utilizan como marcador de posición (o respaldo) para indicar a los usuarios que el contenido se está cargando. Cualquier interfaz de usuario que incorpore en `loading.tsx` se incrustará como parte del archivo estático y se enviará primero. Luego, el resto del contenido dinámico se transmitirá desde el servidor al cliente.

Dentro de su archivo `loading.tsx`, importe un nuevo componente llamado `<DashboardSkeleton>`:

```tsx
import DashboardSkeleton from '@/app/ui/skeletons';
 
export default function Loading() {
  return <DashboardSkeleton />;
}
```

Luego, actualice http://localhost:3000/dashboard y ahora debería ver:

![Panel cargando utilizando esqueletos de carga](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Floading-page-with-skeleton.png&w=1080&q=75&dpl=dpl_8mqvTcfbhtdnPWFJCvFr8naAHAAq)

**Arreglando el error del esqueleto de carga con grupos de rutas**

En este momento, su esqueleto de carga se aplicará también a las páginas de invoices y customers.

Dado que `loading.tsx` tiene un nivel superior a **/invoices/page.tsx** y **/customers/page.tsx** en el sistema de archivos, también se aplica a esas páginas.

Podemos cambiar esto con **Grupos de Rutas**. Cree una nueva carpeta llamada /(overview) dentro de la carpeta del panel. Luego, mueva sus archivos `loading.tsx` y `page.tsx` dentro de la carpeta:

![Ejemplo estructura de carpetas utilizando grupos](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Froute-group.png&w=1920&q=75&dpl=dpl_8mqvTcfbhtdnPWFJCvFr8naAHAAq)

Ahora, el archivo `loading.tsx` solo se aplicará a la página de descripción general de su panel.

Los **grupos de rutas** le permiten organizar archivos en grupos lógicos sin afectar la estructura de la ruta URL. Cuando crea una nueva carpeta usando paréntesis (), el nombre no se incluirá en la ruta URL. Entonces /dashboard/(overview)/page.tsx se convierte en /dashboard.

Aquí, está utilizando un grupo de rutas para garantizar que `loading.tsx` solo se aplique a la página de descripción general de su panel. Sin embargo, también puede utilizar **grupos de rutas** para separar su aplicación en secciones (por ejemplo, rutas (de marketing) y rutas (de panel)) o por equipos para aplicaciones más grandes.


2. ### Para componentes específicos, con `<Suspense>`.

Streaming de un componente

Hasta ahora, estás transmitiendo una página completa. Pero, en cambio, puede ser más granular y transmitir componentes específicos usando **React Suspense**.

**Suspense** le permite diferir la renderización de partes de su aplicación hasta que se cumpla alguna condición (por ejemplo, se cargan los datos). Puede envolver sus componentes dinámicos en **Suspense**. Luego, pásele un componente alternativo para mostrarlo mientras se carga el componente dinámico.

Si recuerda la solicitud de datos lenta, `fetchRevenue()`, esta es la solicitud que está ralentizando toda la página. En lugar de bloquear su página, puede usar **Suspense** para transmitir solo este componente y mostrar inmediatamente el resto de la interfaz de usuario de la página.

Para hacerlo, deberá mover la recuperación de datos al componente. Actualicemos el código para ver cómo se verá:

Elimine todas las instancias de `fetchRevenue()` y sus datos de **/dashboard/(overview)/page.tsx**:

Luego, importe `<Suspense>` desde React y envuélvalo alrededor de `<RevenueChart />`. Puede pasarle un componente alternativo llamado `<RevenueChartSkeleton>`.

```tsx
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestInvoices, fetchCardData } from '@/app/lib/data';
import { Suspense } from 'react';
import { RevenueChartSkeleton } from '@/app/ui/skeletons';
 
export default async function Page() {
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
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
```

Ahora actualice la página, debería ver la información del panel casi de inmediato, mientras se muestra un esqueleto alternativo para `<RevenueChart>`:

![Panel con streaming de un componente](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Floading-revenue-chart.png&w=1080&q=75&dpl=dpl_8mqvTcfbhtdnPWFJCvFr8naAHAAq)

**Práctica: Streaming `<ÚltimasFacturas>`**

¡Ahora es tu turno! Practique lo que acaba de aprender transmitiendo el componente `<LatestInvoices>`.

Mueva fetchLatestInvoices() hacia abajo desde la página al componente `<LatestInvoices>`. Envuelva el componente en un límite `<Suspense>` con un respaldo llamado `<LatestInvoicesSkeleton>`.

```tsx
import { fetchCardData } from '@/app/lib/data';
import { Suspense } from 'react';
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
} from '@/app/ui/skeletons';
//...

 <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
    <Suspense fallback={<RevenueChartSkeleton />}>
        <RevenueChart />
    </Suspense>
    <Suspense fallback={<LatestInvoicesSkeleton />}>
        <LatestInvoices />
    </Suspense>
</div>
```

> Recuerda eliminar las props de `<LatestInvoices>` component.

**Componentes de agrupación**

¡Excelente! Ya casi has llegado, ahora necesitas envolver los componentes `<Card>` en Suspense. Puede recuperar datos para cada tarjeta individual, pero esto podría provocar un efecto de estallido a medida que las tarjetas se cargan, lo que puede resultar visualmente discordante para el usuario.

Entonces, ¿cómo abordarías este problema?

Para crear un efecto más escalonado, puedes agrupar las tarjetas usando un componente contenedor. Esto significa que la `<Sidebar/>` estática se mostrará primero, seguida de las tarjetas, etc.

En su archivo `page.tsx`:

- Elimine los componentes de su `<Card>`.
- Elimine la función `fetchCardData()`.
- Importe un nuevo componente contenedor llamado `<CardWrapper />`.
- Envuelva `<CardWrapper />`en Suspense.

```tsx
import CardWrapper from '@/app/ui/dashboard/cards';
// ...
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from '@/app/ui/skeletons';
 
export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      // ...
    </main>
  );
}
```
Luego, dentro de su componente `<CardWrapper/>`, importe la función `fetchCardData()`:

```tsx
// ...
import { fetchCardData } from '@/app/lib/data';
 
// ...
 
export default async function CardWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();
 
  return (
    <>
      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
    </>
  );
}
```

**Mirando hacia el futuro**

Los componentes de servidor y streaming nos brindan nuevas formas de manejar los estados de carga y obtención de datos, en última instancia con el objetivo de mejorar la experiencia del usuario final.

En el siguiente capítulo, aprenderá sobre la renderización previa parcial, una nueva optimización del compilador Next.js creada teniendo en cuenta el streaming en función de los límites de Suspense.

---

## Prerenderizado parcial (opcional)

El renderizado previo parcial es un nuevo modelo de renderizado experimental creado con streaming.

La renderización previa parcial es una función experimental introducida en Next.js 14. El contenido de esta página puede actualizarse a medida que la función avanza en estabilidad. Es posible que desee omitir este capítulo si prefiere no utilizar funciones experimentales. Este capítulo no es necesario para completar el curso.

- **Combinando contenido estático y dinámico**

Actualmente, si llamas a una función dinámica dentro de tu ruta (por ejemplo, noStore(), cookies(), etc.), toda tu ruta se vuelve dinámica.

Esto se alinea con la forma en que se crean la mayoría de las aplicaciones web hoy en día: puede elegir entre renderizado estático y dinámico para toda su aplicación o para rutas específicas.

Sin embargo, la mayoría de las rutas no son completamente estáticas ni dinámicas. Es posible que tenga una ruta que tenga contenido tanto estático como dinámico. Por ejemplo, digamos que tienes un feed de redes sociales, las publicaciones serían estáticas, pero los "me gusta" de la publicación serían dinámicos. O un sitio de comercio electrónico, donde los detalles del producto son estáticos, pero el carrito del usuario es dinámico.

Volviendo a la página de su panel de control, ¿qué componentes consideraría estáticos o dinámicos?

Una vez que esté listo, haga clic en el botón a continuación para ver cómo dividiríamos la ruta del panel:

![Static vs Dynamic components](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Fdashboard-static-dynamic-components.png&w=1920&q=75&dpl=dpl_33tRNU8h1QxqRd68eMgcXZRVx7K2)

- **¿Qué es el renderizado previo parcial?**

En Next.js 14, hay una vista previa de una nueva optimización del compilador llamada Partial Prerendering. La renderización previa parcial es una característica experimental que le permite renderizar una ruta con un shell de carga estático, manteniendo algunas partes dinámicas. En otras palabras, puedes aislar las partes dinámicas de una ruta. Por ejemplo:

![Ejemplo de Partial prerendering](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Fthinking-in-ppr.png&w=1920&q=75&dpl=dpl_33tRNU8h1QxqRd68eMgcXZRVx7K2)

Cuando un usuario visita una ruta se sirve un shell de ruta estática, lo que hace que la carga inicial sea rápida.

El shell deja huecos donde el contenido dinámico se cargará de forma asíncrona.
Los agujeros asíncronos se cargan en paralelo, lo que reduce el tiempo de carga general de la página.
Esto es diferente de cómo se comporta su aplicación hoy en día, donde rutas enteras son completamente estáticas o dinámicas.

La representación previa parcial combina la entrega estática ultrarrápida con capacidades totalmente dinámicas y creemos que tiene el potencial de convertirse en el modelo de representación predeterminado para aplicaciones web, reuniendo lo mejor de la generación de sitios estáticos y la entrega dinámica.

- **¿Cómo funciona el prerenderizado parcial?**

La renderización previa parcial aprovecha las API simultáneas de React y utiliza Suspense para diferir la renderización de partes de su aplicación hasta que se cumpla alguna condición (por ejemplo, se cargan los datos).

El respaldo está incrustado en el archivo estático inicial junto con otro contenido estático. En el momento de la construcción (o durante la revalidación), las partes estáticas de la ruta se prerenderizan y el resto se pospone hasta que el usuario solicita la ruta.

Vale la pena señalar que envolver un componente en Suspense no hace que el componente en sí sea dinámico (recuerde que usó unstable_noStore para lograr este comportamiento), sino que Suspense se usa como un límite entre las partes estáticas y dinámicas de su ruta.

Lo mejor de la renderización previa parcial es que no es necesario cambiar el código para utilizarla. Siempre que utilice Suspense para ajustar las partes dinámicas de su ruta, Next.js sabrá qué partes de su ruta son estáticas y cuáles son dinámicas.

### **Resumen**

En resumen, ha hecho algunas cosas para optimizar la obtención de datos en su aplicación:

- Creó una base de datos en la misma región que el código de su aplicación para reducir la latencia entre su servidor y la base de datos.

- Datos obtenidos en el servidor con React Server Components. Esto le permite mantener costosas recuperaciones de datos y lógica en el servidor, reduce el paquete de JavaScript del lado del cliente y evita que los secretos de su base de datos queden expuestos al cliente.

- Usó SQL para recuperar solo los datos que necesitaba, reduciendo la cantidad de datos transferidos para cada solicitud y la cantidad de JavaScript necesaria para transformar los datos en memoria.

- Paralelizó la obtención de datos con JavaScript, cuando tenía sentido hacerlo.

- Se implementó Streaming para evitar que las solicitudes de datos lentas bloqueen toda la página y para permitir que el usuario comience a interactuar con la interfaz de usuario sin esperar a que se cargue todo.

- Se movió la recuperación de datos a los componentes que los necesitan, aislando así qué partes de sus rutas deben ser dinámicas en preparación para la renderización previa parcial.

> En el próximo capítulo, veremos dos patrones comunes que quizás necesites implementar al recuperar datos: búsqueda y paginación.

---

## Agregar búsqueda y paginación

En el capítulo anterior, mejoró el rendimiento de carga inicial de su panel con la transmisión. Ahora pasemos a la página /invoices y aprendamos cómo agregar búsqueda y paginación.

Estos son los temas que cubriremos

- Aprenda a utilizar las API de Next.js: searchParams, usePathname y useRouter.

- Implemente búsqueda y paginación utilizando parámetros de búsqueda de URL.

Dentro de su archivo `/dashboard/invoices/page.tsx`, pegue el siguiente código:

```tsx
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
 
export default async function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      {/*  <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense> */}
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
}
```

Dedique algún tiempo a familiarizarse con la página y los componentes con los que trabajará:

`<Search/>` permite a los usuarios buscar facturas específicas.
`<Pagination/>` permite a los usuarios navegar entre páginas de facturas.
`<Table/> `muestra las facturas.

Su funcionalidad de búsqueda abarcará el cliente y el servidor. Cuando un usuario busca una factura en el cliente, los parámetros de URL se actualizarán, los datos se recuperarán en el servidor y la tabla se volverá a representar en el servidor con los nuevos datos.

### ¿Por qué utilizar parámetros de búsqueda de URL?

Como se mencionó anteriormente, utilizará parámetros de búsqueda de URL para administrar el estado de búsqueda. Este patrón puede ser nuevo si está acostumbrado a hacerlo con el estado del lado del cliente.

Hay un par de beneficios al implementar la búsqueda con parámetros de URL:

- URL que se pueden marcar y compartir: dado que los parámetros de búsqueda están en la URL, los usuarios pueden marcar el estado actual de la aplicación, incluidas sus consultas y filtros de búsqueda, para consultarlos o compartirlos en el futuro.

- Representación del lado del servidor y carga inicial: los parámetros de URL se pueden consumir directamente en el servidor para representar el estado inicial, lo que facilita el manejo de la representación del servidor.

- Análisis y seguimiento: tener consultas de búsqueda y filtros directamente en la URL facilita el seguimiento del comportamiento del usuario sin requerir lógica adicional del lado del cliente.

### Agregar la funcionalidad de búsqueda

Hay tres *hooks* del lado cliente que Next.js utilizará para implementar la funcionalidad de búsqueda:

- **useSearchParams:** le permite acceder a los parámetros de la URL actual. Por ejemplo, los parámetros de búsqueda para esta URL /dashboard/invoices?page=1&query=pending se verían así: `{página: '1', consulta: 'pendiente'}`

- **usePathname:** le permite leer el nombre de ruta de la URL actual. Por ejemplo, la ruta **/dashboard/invoices**, usePathname devolvería `'/dashboard/invoices'`.

- **useRouter:** permite la navegación entre rutas dentro de los componentes del cliente mediante programación. Hay varios métodos que puedes utilizar.

> A continuación se ofrece una descripción general rápida de los pasos de implementación:

1. Capture la entrada del usuario.
  - Vaya al componente `<Search>` **(/app/ui/search.tsx)** y notará:

    `"use client"`: este es un componente de cliente, lo que significa que puede utilizar detectores de eventos y *hooks*.

    `<input>:` esta es la entrada de búsqueda.

  - Cree una nueva función `handleSearch` y agregue un detector *onChange* al elemento `<input>`.
  onChange invocará handleSearch cada vez que cambie el valor de entrada.

    ```tsx
      'use client';
  
      import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
      
      export default function Search({ placeholder }: { placeholder: string }) {
        function handleSearch(term: string) {
          console.log(term);
        }
      
        return (
          <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              placeholder={placeholder}
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        );
      }
      ```

      Pruebe que esté funcionando correctamente abriendo la consola en sus Herramientas de desarrollador, luego escriba en el campo de búsqueda. Debería ver el término de búsqueda registrado en la consola.

¡Excelente! Estás capturando la entrada de búsqueda del usuario. Ahora necesitas actualizar la URL con el término de búsqueda.

2. Actualice la URL con los parámetros de búsqueda.

2. Actualiza la URL con los parámetros de búsqueda.

  - Importe el gancho `useSearchParams` desde `'next/navigation'` y asígnelo a una variable:

      ```tsx
      'use client';
      
      import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
      import { useSearchParams } from 'next/navigation';
      
      export default function Search() {
        const searchParams = useSearchParams();
      
        function handleSearch(term: string) {
          console.log(term);
        }
        // ...
      }
      ```
  - Dentro de `handleSearch`, cree una nueva instancia de `URLSearchParams` usando su nueva variable **searchParams**.

      ```tsx
      'use client';

      import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
      import { useSearchParams } from 'next/navigation';
      
      export default function Search() {
        const searchParams = useSearchParams();
      
        function handleSearch(term: string) {
          const params = new URLSearchParams(searchParams);
        }
        // ...
      }
      ```

      `URLSearchParams` es una API web que proporciona métodos de utilidad para manipular los parámetros de consulta de URL. En lugar de crear un literal de cadena complejo, puede usarlo para obtener la cadena de parámetros como `?page=1&query=a`.

  - A continuación, configure la cadena de parámetros según la entrada del usuario. Si la entrada está vacía, desea eliminarla:

        ```tsx
        'use client';
      
        import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
        import { useSearchParams } from 'next/navigation';
        
        export default function Search() {
          const searchParams = useSearchParams();
        
          function handleSearch(term: string) {
            const params = new URLSearchParams(searchParams);
            if (term) {
              params.set('query', term);
            } else {
              params.delete('query');
            }
          }
          // ...
        }
      ```

    Ahora que tiene la cadena de consulta. Puede utilizar los ganchos `useRouter` y `usePathname` de Next.js para actualizar la URL.

  - Importe `useRouter` y `usePathname` desde `'next/navigation'`, y use el método `replace` desde `userRouter()` dentro de **handleSearch**:

        ```tsx
        'use client';

        import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
        import { useSearchParams, usePathname, useRouter } from 'next/navigation';
        
        export default function Search() {
          const searchParams = useSearchParams();
          const pathname = usePathname();
          const { replace } = useRouter();
        
          function handleSearch(term: string) {
            const params = new URLSearchParams(searchParams);
            if (term) {
              params.set('query', term);
            } else {
              params.delete('query');
            }
            replace(`${pathname}?${params.toString()}`);
          }
        }
        ```
    
    Aquí hay un desglose de lo que está sucediendo:

    - `${pathname}` es la ruta actual, en su caso, **"/dashboard/invoices"**.
    - A medida que el usuario escribe en la barra de búsqueda, `params.toString()` traduce esta entrada a un formato compatible con URL.
    - El `replace(${pathname}?${params.toString()})`; El comando actualiza la URL con los datos de búsqueda del usuario. Por ejemplo, **/dashboard/invoices?query=lee** si el usuario busca "lee".
    - La URL se actualiza sin recargar la página, gracias a la navegación del lado del cliente de Next.js (que aprendió en el capítulo sobre navegación entre páginas).

3. Mantenga la URL sincronizada con el campo de entrada.

  - Para garantizar que el campo de entrada esté sincronizado con la URL y se complete al compartir, puede pasar un valor predeterminado a la entrada leyendo en **searchParams**:

    ```tsx
    <input
      className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
      placeholder={placeholder}
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
      defaultValue={searchParams.get('query')?.toString()}
    />
    ```

    **defaultValue vs. Value / Controlled vs. Uncontrolled**

    Si usa el estado para administrar el valor de una entrada, usará el atributo de valor para convertirlo en un componente controlado. Esto significa que React gestionaría el estado de la entrada.

    Sin embargo, como no estás usando el estado, puedes usar defaultValue. Esto significa que la entrada nativa gestionará su propio estado. Esto está bien ya que está guardando la consulta de búsqueda en la URL en lugar del estado.

    
4. Actualice la tabla para reflejar la consulta de búsqueda.

  - Finalmente, debe actualizar el componente de la tabla para reflejar la consulta de búsqueda. Vuelva a la página de facturas. Los componentes de la página aceptan un accesorio llamado **searchParams**, por lo que puede pasar los parámetros de URL actuales al componente `<Table>`.

      ```tsx
      import Pagination from '@/app/ui/invoices/pagination';
      import Search from '@/app/ui/search';
      import Table from '@/app/ui/invoices/table';
      import { CreateInvoice } from '@/app/ui/invoices/buttons';
      import { lusitana } from '@/app/ui/fonts';
      import { Suspense } from 'react';
      import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
      
      export default async function Page({
        searchParams,
      }: {
        searchParams?: {
          query?: string;
          page?: string;
        };
      }) {
        const query = searchParams?.query || '';
        const currentPage = Number(searchParams?.page) || 1;
      
        return (
          <div className="w-full">
            <div className="flex w-full items-center justify-between">
              <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
              <Search placeholder="Search invoices..." />
              <CreateInvoice />
            </div>
            <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
              <Table query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
              {/* <Pagination totalPages={totalPages} /> */}
            </div>
          </div>
        );
      }
      ```

  - Si navega al componente `<Table>`, verá que los dos accesorios, consulta y página actual, se pasan a la función `fetchFilteredInvoices()` que devuelve las facturas que coinciden con la consulta.

      ```tsx
      // ...
      export default async function InvoicesTable({
        query,
        currentPage,
      }: {
        query: string;
        currentPage: number;
      }) {
        const invoices = await fetchFilteredInvoices(query, currentPage);
        // ...
      }
      ```

      Una vez implementados estos cambios, continúe y pruébelo. Si busca un término, actualizará la URL, lo que enviará una nueva solicitud al servidor, los datos se recuperarán en el servidor y solo se devolverán las facturas que coincidan con su consulta.


  - **¿Cuándo usar el gancho useSearchParams() frente al accesorio searchParams?** Es posible que hayas notado que utilizaste dos formas diferentes de extraer parámetros de búsqueda. El uso de uno u otro depende de si estás trabajando en el cliente o en el servidor.

    - ` <Search>` es un componente del cliente, por lo que utilizó el gancho `useSearchParams()` para acceder a los parámetros desde el cliente.

    - `<Table>` es un componente del servidor que recupera sus propios datos, por lo que puede pasar la propiedad searchParams de la página al componente.

  > Como regla general, si desea leer los parámetros del cliente, utilice el gancho `useSearchParams()` ya que esto evita tener que volver al servidor.

  - **Mejores prácticas: Debouncing** ¡Felicidades! ¡Has implementado la búsqueda con Next.js! Pero hay algo que puedes hacer para optimizarlo. Dentro de su función handleSearch, agregue el siguiente console.log:

        ```tsx
        function handleSearch(term: string) {
          console.log(`Searching... ${term}`);
        
          const params = new URLSearchParams(searchParams);
          if (term) {
            params.set('query', term);
          } else {
            params.delete('query');
          }
          replace(`${pathname}?${params.toString()}`);
        }
        ```

    ¡Está actualizando la URL con cada pulsación de tecla y, por lo tanto, consulta su base de datos con cada pulsación de tecla! Esto no es un problema ya que nuestra aplicación es pequeña, pero imagine si su aplicación tuviera miles de usuarios, cada uno de los cuales enviara una nueva solicitud a su base de datos con cada pulsación de tecla.

    El **Debouncing** es una práctica de programación que limita la velocidad a la que se puede activar una función. En nuestro caso, solo desea consultar la base de datos cuando el usuario ha dejado de escribir.

    **Cómo funciona el debounce:**

    - **Evento desencadenante: (Trigger event)** cuando ocurre un evento que debe ser rechazado (como una pulsación de tecla en el cuadro de búsqueda), se inicia un cronómetro.

    - **Espere:** si ocurre un nuevo evento antes de que expire el temporizador, el temporizador se reinicia.

    - **Ejecución:** Si el temporizador llega al final de su cuenta regresiva, se ejecuta la función antirrebote.


Puede implementar la función debounce de varias maneras, incluida la creación manual de su propia función debouncing. Para simplificar las cosas, usaremos una biblioteca llamada `use-debounce`.

Install use-debounce:

```bash
npm i use-debounce
```

Luego en tu componente `<Search>` importa la función `useDebouncedCallback`:

```tsx
// ...
import { useDebouncedCallback } from 'use-debounce';
 
// Inside the Search Component...
const handleSearch = useDebouncedCallback((term) => {
  console.log(`Searching... ${term}`);
 
  const params = new URLSearchParams(searchParams);
  if (term) {
    params.set('query', term);
  } else {
    params.delete('query');
  }
  replace(`${pathname}?${params.toString()}`);
}, 300);
```

Esta función envolverá el contenido de `handleSearch` y solo ejecutará el código después de un tiempo específico una vez que el usuario haya dejado de escribir (300 ms).

Al eliminar el rebote, puede reducir la cantidad de solicitudes enviadas a su base de datos, ahorrando así recursos.

## Agregar paginación

Después de introducir la función de búsqueda, notará que la tabla muestra solo 6 facturas a la vez. Esto se debe a que la función `fetchFilteredInvoices()` en data.ts devuelve un máximo de 6 facturas por página.

Agregar paginación permite a los usuarios navegar por las diferentes páginas para ver todas las facturas. Veamos cómo puedes implementar la paginación usando parámetros de URL, tal como lo hiciste con la búsqueda.

Navegue hasta el componente `<Pagination/>` y notará que es un componente de cliente. No desea recuperar datos del cliente, ya que esto expondría los secretos de su base de datos (recuerde, no está utilizando una capa API). En su lugar, puede recuperar los datos en el servidor y pasarlos al componente como accesorio.

En **/dashboard/invoices/page.tsx**, importe una nueva función llamada `fetchInvoicesPages` y pase la consulta de **searchParams** como argumento:

```tsx
// ...
import { fetchInvoicesPages } from '@/app/lib/data';
 
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string,
    page?: string,
  },
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
 
  const totalPages = await fetchInvoicesPages(query);
 
  return (
    // ...
  );
}
```

`fetchInvoicesPages` devuelve el número total de páginas según la consulta de búsqueda. Por ejemplo, si hay 12 facturas que coinciden con la consulta de búsqueda y cada página muestra 6 facturas, entonces el número total de páginas sería 2.

A continuación, pase la propiedad totalPages al componente `<Pagination/>`:

```tsx
// ...
 
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
 
  const totalPages = await fetchInvoicesPages(query);
 
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
```

Su aplicación se interrumpirá temporalmente porque aún no ha implementado la lógica `<Pagination/>`. ¡Hagámoslo ahora!

Navegue hasta el componente `<Pagination/>`. Importe los ganchos `usePathname` y `useSearchParams`. Usaremos esto para obtener la página actual y configurar la nueva página:

```tsx
'use client';
 
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { generatePagination } from '@/app/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';
 
export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
 
  // ...
}
```

A continuación, cree una nueva función dentro del componente `<Pagination>` llamada `createPageURL`. De manera similar a la búsqueda, usará `URLSearchParams` para establecer el nuevo número de página y `pathName` para crear la cadena URL.

```tsx
'use client';
 
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { generatePagination } from '@/app/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';
 
export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
 
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
 
  // ...
}
```

Aquí hay un desglose de lo que está sucediendo:

`createPageURL` crea una instancia de los parámetros de búsqueda actuales.
Luego, actualiza el parámetro "**page**" al número de página proporcionado.
Finalmente, construye la URL completa utilizando el nombre de la ruta y los parámetros de búsqueda actualizados.
El resto del componente `<Pagination>` se ocupa del estilo y los diferentes estados (primero, último, activo, deshabilitado, etc.). No entraremos en detalles en este curso, pero siéntete libre de revisar el código para ver dónde se llama a `createPageURL`.

Finalmente, cuando el usuario escribe una nueva consulta de búsqueda, desea restablecer el número de página a 1. Puede hacerlo actualizando la función `handleSearch` en su componente `<Search>`:

```tsx
'use client';
 
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
 
export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
 
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
 
```

### Resumen

¡Felicidades! Acaba de implementar la búsqueda y la paginación utilizando parámetros de URL y las API de Next.js.

En resumen, en este capítulo:

- Ha manejado la búsqueda y la paginación con parámetros de búsqueda de URL en lugar del estado del cliente.
- Has obtenido datos en el servidor.
- Estás utilizando el hook de enrutador `useRouter` para transiciones más fluidas del lado del cliente.

Estos patrones son diferentes de los que puede estar acostumbrado cuando trabaja con React del lado del cliente, pero con suerte, ahora comprenderá mejor los beneficios de usar parámetros de búsqueda de URL y llevar este estado al servidor.

---

## Mutación de Datos

Aprenda a mutar datos con Server Actions.

En el capítulo anterior, implementó la búsqueda y la paginación utilizando parámetros de búsqueda de URL y las API de Next.js. ¡Continuemos trabajando en la página Facturas agregando la capacidad de crear, actualizar y eliminar facturas!

Estos son los temas que cubriremos

- Qué son las acciones de React Server y cómo usarlas para mutar datos.

- Cómo trabajar con formularios y componentes de servidor.

- Mejores prácticas para trabajar con el objeto formData nativo, incluida la validación de tipos.

- Cómo revalidar la caché del cliente utilizando la API `revalidatePath`.

- Cómo crear segmentos de ruta dinámicos con ID específicas.

- Cómo utilizar el gancho `useFormStatus` de React para actualizaciones optimizadas.


### ¿Qué son los Server Actions?

Las acciones de React Server le permiten ejecutar código asincrónico directamente en el servidor. Eliminan la necesidad de crear endpoints API para modificar sus datos. En su lugar, escribe funciones asincrónicas que se ejecutan en el servidor y pueden invocarse desde sus componentes de cliente o servidor.

La seguridad es una prioridad absoluta para las aplicaciones web, ya que pueden ser vulnerables a diversas amenazas. Aquí es donde entran en juego las Server Actions. Ofrecen una solución de seguridad eficaz, que protege contra diferentes tipos de ataques, protege sus datos y garantiza el acceso autorizado. Las Server Actions logran esto a través de técnicas como solicitudes **POST, cierres cifrados, controles de entrada estrictos, hash de mensajes de error y restricciones de host**, todos trabajando juntos para mejorar significativamente la seguridad de su aplicación.

**Usar formularios con acciones del servidor**

En React, puedes usar el atributo de acción en el elemento `<form>` para invocar acciones. La acción recibirá automáticamente el objeto formData nativo, que contiene los datos capturados.

```tsx
// Server Component
export default function Page() {
  // Action
  async function create(formData: FormData) {
    'use server';
 
    // Logic to mutate data...
  }
 
  // Invoke the action using the "action" attribute
  return <form action={create}>...</form>;
}
```

Una ventaja de invocar una acción del servidor dentro de un componente del servidor es la mejora progresiva: los formularios funcionan incluso si JavaScript está deshabilitado en el cliente.

**Next.js con acciones del servidor**

Las acciones del servidor también están profundamente integradas con el almacenamiento en caché de Next.js. Cuando se envía un formulario a través de una acción del servidor, no solo puede usar la acción para mutar datos, sino que también puede revalidar el caché asociado usando API como `revalidatePath` y `revalidateTag`.

### Creando una factura - Invoice

Estos son los pasos que deberás seguir para crear una nueva factura:

1. **Cree un formulario para capturar la entrada del usuario.**

    - Para comenzar, dentro de la carpeta /invoices, agregue un nuevo segmento de ruta llamado /create con un archivo page.tsx:

    ![Estructura de archivos](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Fcreate-invoice-route.png&w=1920&q=75&dpl=dpl_3h1BESzeFKFcy7pGi2Svm9s7FMVm)

    Dentro de su archivo page.tsx, pegue el siguiente código y luego dedique un tiempo a estudiarlo:

      ```tsx
      import Form from '@/app/ui/invoices/create-form';
      import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
      import { fetchCustomers } from '@/app/lib/data';
      
      export default async function Page() {
        const customers = await fetchCustomers();
      
        return (
          <main>
            <Breadcrumbs
              breadcrumbs={[
                { label: 'Invoices', href: '/dashboard/invoices' },
                {
                  label: 'Create Invoice',
                  href: '/dashboard/invoices/create',
                  active: true,
                },
              ]}
            />
            <Form customers={customers} />
          </main>
        );
      }
      ```

      Su página es un componente de servidor que busca clientes y los pasa al componente `<Form>`. Para ahorrar tiempo, ya hemos creado el componente `<Form>` para usted.

      Navegue hasta el componente `<Form>` y verá que el formulario:

      - Tiene dos elementos `<select>` (desplegables): clientes y estado.
      - Tiene un elemento `<input>` para el monto con `type="number"`.
      - Tiene un botón con `type="submit"`.

      ![Vista del formulario /invoice/create](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Fcreate-invoice-page.png&w=1080&q=75&dpl=dpl_3h1BESzeFKFcy7pGi2Svm9s7FMVm)

2. **Cree una acción del servidor e invoquela desde el formulario.**

    - Ahora creemos una acción del servidor que se llamará cuando se envíe el formulario. Navegue a su directorio lib y cree un nuevo archivo llamado `action.ts.` En la parte superior de este archivo, agregue la directiva de servidor de `"use server"` de React:

    - Al agregar `"use server"`, marca todas las funciones exportadas dentro del archivo como funciones de servidor. Estas funciones del servidor se pueden importar luego a los componentes Cliente y Servidor, lo que los hace extremadamente versátiles.

    - También puede escribir Acciones del servidor directamente dentro de los Componentes del servidor agregando `"use server"` dentro de la acción. Pero para este curso, los mantendremos todos organizados en un archivo separado.

    En su archivo `action.ts`, cree una nueva función asíncrona que acepte **formData**:

      ```tsx
      'use server';
  
      export async function createInvoice(formData: FormData) {}
      ```

    Luego, en su componente `<Form>`, importe el `createInvoice` desde su archivo `actions.ts` .Agregue un atributo de acción al elemento `<Form>` y llame a la acción `createInvoice`.

        ```tsx
        'use client';
    
        import { customerField } from '@/app/lib/definitions';
        import Link from 'next/link';
        import {
          CheckIcon,
          ClockIcon,
          CurrencyDollarIcon,
          UserCircleIcon,
        } from '@heroicons/react/24/outline';
        import { Button } from '@/app/ui/button';
        import { createInvoice } from '@/app/lib/actions';
        
        export default function Form({
          customers,
        }: {
          customers: customerField[];
        }) {
          return (
            <form action={createInvoice}>
              // ...
          )
        }
        ```

    Es bueno saberlo: en HTML, pasaría una URL al atributo de acción. Esta URL sería el destino donde se deben enviar sus datos de formulario (generalmente un endpoint API).

    Sin embargo, en React, el atributo de acción se considera un apoyo especial, lo que significa que React se basa en la parte superior para permitir que las acciones se invocen.En lugar de llamar explícitamente a una API, puede pasar una función a la acción.

    Detrás de escena, las acciones del servidor crean un endpoint POST API.Es por eso que no necesita crear endpoints de API manualmente al usar acciones del servidor.

3. **Dentro de su Acción del Servidor, extraiga los datos del objeto formData.**

  - De vuelta en su archivo `actions.ts`, deberá extraer los valores de **FormData**, hay un par de métodos que puede usar. Para este ejemplo, usemos el método `.get(name)`.

            ```tsx
            'use server';
      
              export async function createInvoice(formData: FormData) {
                const rawFormData = {
                  customerId: formData.get('customerId'),
                  amount: formData.get('amount'),
                  status: formData.get('status'),
                };
                // Test it out:
                console.log(rawFormData);
              }
            ```
  > Consejo: Si está trabajando con formularios que tienen muchos campos, es posible que desee considerar usar el método entries() con el objeto de JavaScript `Object.fromEnries()` .Por ejemplo:

            ```javascript
            const rawFormData = Object.FromEnries (formData.Entries ())
            ```

  Para verificar que todo esté conectado correctamente, continúe y pruebe el formulario. Después de enviar, debe ver los datos que acaba de ingresar en el formulario registrado en su terminal.

4. **Valida y prepara los datos a insertar en tu base de datos.**

  - Antes de enviar los datos del formulario a su base de datos, desea asegurarse de que esté en el formato correcto y con los tipos correctos. Si recuerda desde anteriormente en el curso, la tabla de sus facturas espera datos en el siguiente formato:

          ```ts
          export type Invoice = {
            id: string; // Will be created on the database
            customer_id: string;
            amount: number; // Stored in cents
            status: 'pending' | 'paid';
            date: string;
          };
          ```
  Hasta ahora, solo tiene el **customer_id**, **amount** y **status** del formulario.

  - **Tipo de validación y coerción:** Es importante validar que los datos de su formulario se alinean con los tipos esperados en su base de datos.

  Notará que la cantidad es de tipo de cadena y no número. Esto se debe a que los elementos de entrada con `type="number"` realmente devuelven una cadena, ¡no un número!

  Para manejar la validación de tipo, tiene algunas opciones. Si bien puede validar manualmente los tipos, usar una biblioteca de validación de tipo puede ahorrarle tiempo y esfuerzo. Para su ejemplo, utilizaremos **Zod**, una biblioteca de validación **TypeScript-First** que puede simplificar esta tarea por usted.

  En su archivo `actions.ts`, importe **Zod** y defina un esquema que coincida con la forma de su objeto de formulario. Este esquema validará los **FormData** antes de guardarlo en una base de datos.

      ```tsx
      'use server';
 
        import { z } from 'zod';
        
        const InvoiceSchema = z.object({
          id: z.string(),
          customerId: z.string(),
          amount: z.coerce.number(),
          status: z.enum(['pending', 'paid']),
          date: z.string(),
        });
        
        const CreateInvoice = InvoiceSchema.omit({ id: true, date: true });
        
        export async function createInvoice(formData: FormData) {
          // ...
        }
      ```

  El campo amount se establece específicamente para coaccionar (cambiar) `z.coerce.number()` de una cadena a un número al tiempo que también valida su tipo.

  Luego puede pasar su **RawFormData** a `crearInvoice` para validar los tipos:

        ```tsx
        // ...
        export async function createInvoice(formData: FormData) {
          const { customerId, amount, status } = CreateInvoice.parse({
            customerId: formData.get('customerId'),
            amount: formData.get('amount'),
            status: formData.get('status'),
          });
        }
        ```

  > Por lo general, es una buena práctica almacenar valores monetarios en centavos en su base de datos para eliminar los errores de punto flotante de JavaScript y garantizar una mayor precisión.

      ```tsx
      // ...
      export async function createInvoice(formData: FormData) {
        const { customerId, amount, status } = CreateInvoice.parse({
          customerId: formData.get('customerId'),
          amount: formData.get('amount'),
          status: formData.get('status'),
        });
        const amountInCents = amount * 100;
      }
      ```

  - **Creación de fechas:** finalmente, creemos una nueva fecha con el formato "yyyy-mm-dd" para la fecha de creación de la factura:

      ```tsx
      // ...
        export async function createInvoice(formData: FormData) {
          const { customerId, amount, status } = CreateInvoice.parse({
            customerId: formData.get('customerId'),
            amount: formData.get('amount'),
            status: formData.get('status'),
          });
          const amountInCents = amount * 100;
          const date = new Date().toISOString().split('T')[0];
        }
      ```
  
5. **Inserte los datos y maneje cualquier error.**

  - Ahora que tiene todos los valores que necesita para su base de datos, puede crear una consulta SQL para insertar la nueva factura en su base de datos y pasar las variables:

      ```tsx
      import { z } from 'zod';
      import { sql } from '@vercel/postgres';
      
      // ...
      
      export async function createInvoice(formData: FormData) {
        const { customerId, amount, status } = CreateInvoice.parse({
          customerId: formData.get('customerId'),
          amount: formData.get('amount'),
          status: formData.get('status'),
        });
        const amountInCents = amount * 100;
        const date = new Date().toISOString().split('T')[0];
      
        await sql`
          INSERT INTO invoices (customer_id, amount, status, date)
          VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
        `;
      }
      ```

  > En este momento, no estamos manejando ningún error.Lo haremos en el próximo capítulo. Por ahora, pasemos al siguiente paso.

6. **Vuelva a validar el caché y redirija al usuario a la página de facturas.**

  - Next.js tiene un **Client-side Router Cache** del lado del cliente que almacena los segmentos de ruta en el navegador del usuario por un tiempo. Junto con la prioridad, este caché asegura que los usuarios puedan navegar rápidamente entre las rutas al tiempo que reduce el número de solicitudes realizadas al servidor.

  - Dado que está actualizando los datos que se muestran en la ruta de las facturas, desea borrar este caché y activar una nueva solicitud al servidor. Puede hacer esto con la función `revalidatePath` de Next.js:

    ```tsx
    'use server';
  
    import { z } from 'zod';
    import { sql } from '@vercel/postgres';
    import { revalidatePath } from 'next/cache';
    
    // ...
    
      export async function createInvoice(formData: FormData) {
        const { customerId, amount, status } = CreateInvoice.parse({
          customerId: formData.get('customerId'),
          amount: formData.get('amount'),
          status: formData.get('status'),
        });
        const amountInCents = amount * 100;
        const date = new Date().toISOString().split('T')[0];
      
        await sql`
          INSERT INTO invoices (customer_id, amount, status, date)
          VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
        `;
      
        revalidatePath('/dashboard/invoices');
      }
    ```

  - Una vez que se haya actualizado la base de datos, la ruta **/dasboard/invoices** se revalidará y se obtendrán datos nuevos del servidor. En este punto, también desea redirigir al usuario de regreso a la página **/dasboard/invoices**. Puede hacer esto con la función de redirección `redirect` de Next.js:

          ```tsx
            'use server';
        
            import { z } from 'zod';
            import { sql } from '@vercel/postgres';
            import { revalidatePath } from 'next/cache';
            import { redirect } from 'next/navigation';
            
            // ...
            
            export async function createInvoice(formData: FormData) {
              // ...
            
              revalidatePath('/dashboard/invoices');
              redirect('/dashboard/invoices');
            }
          ```

  - ¡Felicidades! Acaba de implementar su primer Server Action. Pruébelo agregando una nueva factura, si todo funciona correctamente:

    - Debe ser redirigido a la ruta **/dasboard/invoices** en el submit.
    - Debería ver la nueva factura en la parte superior de la tabla.

### Actualizar una factura

El formulario de factura de actualización es similar al formulario Crear una factura, excepto que deberá pasar la ID de factura para actualizar el registro en su base de datos. Veamos cómo puede obtener y pasar la identificación de la factura.

Estos son los pasos que tomará para actualizar una factura:

1. **Cree un nuevo segmento de ruta dinámica con la ID de factura.**

  - Next.js le permite crear segmentos de ruta dinámicos cuando no conoce el nombre exacto del segmento y desea crear rutas basadas en datos. Esto podría ser títulos de publicaciones de blog, páginas de productos, etc. Puede crear segmentos de ruta dinámicos envolviendo el nombre de una carpeta corchetes.Por ejemplo, [id], [post] o [slug].

  En su carpeta **/facturas**, cree una nueva ruta dinámica llamada [id], luego una nueva ruta llamada Editar con un archivo `page.tsx`. La estructura de su archivo debe verse así:

  ![Estructura del archivo](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Fedit-invoice-route.png&w=1920&q=75&dpl=dpl_3h1BESzeFKFcy7pGi2Svm9s7FMVm)

  En su componente `<Table>`, observe que hay un botón `<UpdateInvoice />` que recibe la ID de la factura de los registros de la tabla.

  ```tsx
      export default async function InvoicesTable({
      invoices,
    }: {
      invoices: InvoiceTable[];
    }) {
      return (
        // ...
        <td className="flex justify-end gap-2 whitespace-nowrap px-6 py-4 text-sm">
          <UpdateInvoice id={invoice.id} />
          <DeleteInvoice id={invoice.id} />
        </td>
        // ...
      );
    }
  ```

    Navegue a su componente `<UpdateInvoice />` y actualice el href del enlace para aceptar el Prop.Puede usar literales de plantilla para vincular a un segmento de ruta dinámica:

    ```tsx
    import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
    import Link from 'next/link';
    
    // ...
    
    export function UpdateInvoice({ id }: { id: string }) {
      return (
        <Link
          href={`/dashboard/invoices/${id}/edit`}
          className="rounded-md border p-2 hover:bg-gray-100"
        >
          <PencilIcon className="w-5" />
        </Link>
      );
    }
    ```

2. **Lea la ID de factura de los parámetros de la página.**
    
    - En su `<Page>` componente, pegue el siguiente código:
    ```tsx
    import Form from '@/app/ui/invoices/edit-form';
    import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
    import { fetchCustomers } from '@/app/lib/data';
    
    export default async function Page() {
      return (
        <main>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Invoices', href: '/dashboard/invoices' },
              {
                label: 'Edit Invoice',
                href: `/dashboard/invoices/${id}/edit`,
                active: true,
              },
            ]}
          />
          <Form invoice={invoice} customers={customers} />
        </main>
      );
    }
    ```

    Observe cómo es similar a su página **/create** invoices, excepto que importa un formulario diferente (desde el archivo edit-form.tsx). Este formulario debe estar previamente poblado con un valor predeterminado para el nombre del cliente, el monto de la factura y el estado. Para prepoblar los campos de formulario, debe obtener la factura específica con su **id**.

    Además de **searchParams**, los componentes de la página también aceptan un accesorio llamado **params** que puede usar para acceder a la id. Actualice su componente `<Page>` para recibir el accesorio:

    ```tsx
    import Form from '@/app/ui/invoices/edit-form';
    import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
    import { fetchCustomers } from '@/app/lib/data';
    
    export default async function Page({ params }: { params: { id: string } }) {
      const id = params.id;
      // ...
    }
    ```

3. **Obtenga la factura específica de su base de datos y prepoble previamente el formulario**

  - Para lograr esto vamos a tener que:

    - Importar una nueva función llamada `fetchInvoiceById`  y pasar la identificación **id** como argumento.
    - Importar `fetchCustomers` para obtener los nombres de los clientes para el menú desplegable.

  Puede usar `Promise.all`. Todo para obtener la factura y los clientes en paralelo.

  ```tsx
  import Form from '@/app/ui/invoices/edit-form';
  import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
  import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
  
  export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [invoice, customers] = await Promise.all([
      fetchInvoiceById(id),
      fetchCustomers(),
    ]);
    // ...
  }
  ```

  ¡Excelente! Ahora, pruebe que todo está conectado correctamente, debe ver un formulario previamente poblado con los detalles de la factura al editar.

4. **Actualice los datos de la factura en su base de datos.**

  - **Pasar la id al Server Action:** Por último, desea pasar la **id** a la acción del servidor para que pueda actualizar el registro correcto en su base de datos. No puede pasar la identificación como un argumento.En su lugar, puede pasar **id** a la acción del servidor usando el enlace JS. Esto asegurará que todos los valores pasados a la acción del servidor esten codificados.

  ```tsx
  // ...
  import { updateInvoice } from '@/app/lib/actions';
  
  export default function EditInvoiceForm({
    invoice,
    customers,
  }: {
    invoice: InvoiceForm;
    customers: CustomerField[];
  }) {
    const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
  
    return (
      <form action={updateInvoiceWithId}>
        <input type="hidden" name="id" value={invoice.id} />
      </form>
    );
  }
  ```

> Nota: El uso de un campo de entrada oculto en su forma también funciona (por ejemplo, `<input type = "hidden" name="id" value={invoice.id} />`). Sin embargo, los valores aparecerán como texto completo en la fuente HTML, que no es ideal para datos confidenciales como **IDS**.

Luego, en su archivo Actions.ts, cree una nueva acción, `updateInvoice`:

```tsx
// Use Zod to update the expected types
const UpdateInvoice = InvoiceSchema.omit({ date: true, id: true });
 
// ...
 
export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  const amountInCents = amount * 100;
 
  await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
```

De manera similar a la acción `createInvoice`, aquí está:

1. Extracción de los datos de FormData.
2. Validando los tipos con Zod.
3. Convertir la cantidad a centavos.
4. Pasando las variables a su consulta SQL.
5. Llamar a `revalidatePath` para borrar el caché del cliente y hacer una nueva solicitud del servidor.
6. Llamar a `redirect` para redirigir al usuario a la página de la factura.

¡No olvide importar la acción updateInvoice en su componente `<Form>`!

### Eliminar una factura

Para eliminar una factura utilizando una acción de servidor, envuelva el botón Eliminar en un elemento `<form>` y pase la **id** a la acción del servidor usando bind:

```tsx
import { deleteInvoice } from '@/app/lib/actions';
 
// ...
 
export function DeleteInvoice({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);
 
  return (
    <form action={deleteInvoiceWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}
```

Dentro de su archivo `actions.ts`, cree una nueva acción llamada `deleteInVoice`.

```tsx
const UpdateInvoice = FormSchema.omit({ date: true, id: true });
// ...
 
export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');
}
```

Dado que esta acción se llama en la ruta **/dashboard/invoices**, no necesita llamar a redirección.Llamar a `revalidatePath` activará una nueva solicitud del servidor y volverá a renderizar la tabla.

En este capítulo, aprendió a usar acciones del servidor para mutar datos. También aprendió a usar la API `revalidatePath` para revalidar el Next.js cache y `redirect` para redirigir al usuario a una nueva página.

También puede leer más sobre seguridad con acciones del servidor para un aprendizaje adicional.

---

## Manejo de Errores

En el capítulo anterior, aprendió cómo mutar datos utilizando Server Actions. Veamos cómo puede manejar los errores con gracia usando las declaraciones de **try/catch** de JavaScript y las API NEXT.JS.

  - Cómo usar el archivo `error.tsx` para detectar errores en los segmentos de su ruta y mostrar una interfaz UI al usuario.

  - Cómo usar la función **notFound** y el archivo **not-found** para manejar 404 (errores para recursos que no existen).

### Agregar try/catch a las acciones del servidor

Primero, agregemos las declaraciones de **try/catch** de JavaScript a las acciones de su servidor para permitirle manejar errores.

Tenga en cuenta cómo se llama redirección fuera del bloque de **try/catch**. Esto se debe a que la redirección funciona arrojando un error, que sería capturado por el bloque de captura. Para evitar esto, puede llamar a Redirect después de **try/catch**. **Redirect** solo sería accesible si la prueba es exitosa.

Ahora, verifiquemos qué sucede cuando se lanza un error en la acción de su servidor. Puede hacer esto lanzando un error antes. Por ejemplo, en la acción deleteInvoice, arroje un error en la parte superior de la función:

```tsx
export async function deleteInvoice(id: string) {
  throw new Error('Failed to Delete Invoice');
 
  // Unreachable code block
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice' };
  }
}
```

Cuando intente eliminar una factura, debería ver un error en LocalHost.

Ver estos errores es útil mientras se desarrolla, ya que puede atrapar cualquier problema potencial temprano. Sin embargo, también debe mostrar errores al usuario para evitar una falla abrupta y permitir que su aplicación continúe ejecutándose.

Aquí es donde entra el archivo Next.js `error.tsx`.

### Manejo de todos los errores con error.tsx

El archivo `error.tsx` se puede usar para definir un límite de UI para un segmento de ruta. Sirve como una trampa para errores inesperados y le permite mostrar una interfaz UI de respaldo a sus usuarios.

Dentro de su carpeta **/dashboard/invoices**, cree un nuevo archivo llamado `error.tsx` y pegue el siguiente código:

```tsx
'use client';
 
import { useEffect } from 'react';
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);
 
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}
```

Hay algunas cosas que notará sobre el código anterior:

- `"use client"` - error.tsx debe ser un componente de cliente.
- Acepta dos accesorios:
  - **error:** este objeto es una instancia del objeto error nativo de JavaScript.
  - **reset:** esta es una función para restablecer el límite de error. Cuando se ejecuta, la función intentará volver a renderizar el segmento de ruta.

Cuando intentes eliminar una factura nuevamente, debería ver la siguiente interfaz de usuario:

![interfaz de usuario con manejo del error](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Ferror-page.png&w=1080&q=75&dpl=dpl_3h1BESzeFKFcy7pGi2Svm9s7FMVm)

### Manejo de 404 errores con la función NotFound

Otra forma en que puede manejar los errores es usar la función **notFound**. Si bien `error.tsx` es útil para captar todos los errores, no se puede usar cuando intenta obtener un recurso que no existe.

Por ejemplo, visite http://localhost:3000/tablero/facturas/2e94d1ed-d220-449f-9f11-f0bbBed9645/edit

Este es un uuid falso que no existe en su base de datos. Verá inmediatamente `error.tsx` se inicia porque esta es una ruta hija de /invoices donde se define el `error.tsx`

Sin embargo, si desea ser más específico, puede mostrar un error 404 para decirle al usuario que no se ha encontrado el recurso que intenta acceder.

Puede confirmar que el recurso no se ha encontrado al entrar en su función `fetchInvoiceById` en `data.tsx`, y registrar en la consola la factura devuelta:

Ahora que sabe que la factura no existe en su base de datos, usemos Notfound para manejarla. Navegue a `/dashboard/invoices/[id]/edit/page.tsx`, e `import {nofound} from 'next/navigation'`.

Luego, puede usar un condicional para invocar nofund si la factura no existe:

```tsx
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { updateInvoice } from '@/app/lib/actions';
import { notFound } from 'next/navigation';
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);
 
  if (!invoice) {
    notFound();
  }
 
  // ...
}
```

¡Perfecto! `<Page>` ahora lanzará un error si no se encuentra una factura específica. Para mostrar una interfaz de usuario de error al usuario cree un archivo `not-found.tsx` dentro de la carpeta **/edit**.

![Ejemplo de la estructura de carpetas](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Fnot-found-file.png&w=1920&q=75&dpl=dpl_3h1BESzeFKFcy7pGi2Svm9s7FMVm)

Luego, dentro del archivo `not-found.tsx`, pegue el siguiente código:

```tsx
import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
 
export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested invoice.</p>
      <Link
        href="/dashboard/invoices"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  );
}
```

Actualice la ruta, y ahora debería ver la siguiente interfaz de usuario:

![Interfaz de usuario 404 Not Found](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2F404-not-found-page.png&w=1080&q=75&dpl=dpl_3h1BESzeFKFcy7pGi2Svm9s7FMVm)

> Eso es algo a tener en cuenta, notfound tendrá prioridad sobre el error.

### Otras lecturas

Para obtener más información sobre el manejo de errores en Next.js, consulte la siguiente documentación:

- [Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- [error.js API Reference](https://nextjs.org/docs/app/api-reference/file-conventions/error)
- [notFound() API Reference](https://nextjs.org/docs/app/api-reference/functions/not-found)
- [not-found.js API Reference](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)

---

## Mejora de la accesibilidad

En el capítulo anterior, observamos cómo capturar errores (incluidos 404 errores) y mostrar una respuesta al usuario. Sin embargo, todavía necesitamos discutir otra pieza del rompecabezas: la validación de formulario. Veamos cómo implementar la validación del lado del servidor con acciones del servidor y cómo puede mostrar errores de formulario usando `useFormState` Hook, *¡al tiempo que tiene en cuenta la accesibilidad!*

Estos son los temas que cubriremos

- Cómo usar `eslint-plugin-jsx-a11y` con Next.js para implementar las mejores prácticas de accesibilidad.

- Cómo implementar la validación de formulario del lado del servidor.

- Cómo usar el hook React `useFormState` para manejar los errores de formulario y mostrarlos al usuario.

### ¿Qué es la accesibilidad?

La accesibilidad se refiere al diseño e implementación de aplicaciones web que todos pueden usar, incluidas aquellas con discapacidades. Es un vasto tema que cubre muchas áreas, como navegación de teclado, HTML semántico, imágenes, colores, videos, etc.

Si bien no entraremos profundamente en la accesibilidad en este curso, discutiremos las funciones de accesibilidad disponibles en Next.js y algunas prácticas comunes para que sus aplicaciones sean más accesibles.

> Si desea obtener más información sobre accesibilidad, recomendamos el curso de Accesibilidad de aprendizaje de [Web.dev](https://web.dev/learn/accessibility/).

### Uso del complemento de accesibilidad Eslint en Next.js

Por defecto, Next.js incluye el complemento `eslint-plugin-jsx-a11y` para ayudar a atrapar problemas de accesibilidad temprano. Por ejemplo, este complemento advierte si tiene imágenes sin texto `alt`, si usa los atributos de `aria-*` y `role` de manera incorrecta, y más.

¡Veamos cómo funciona esto!

Agregue un script en su archivo paquete.json:

```json

"scripts": {
    "build": "next build",
    "dev": "next dev",
    "seed": "node -r dotenv/config ./scripts/seed.js",
    "start": "next start",
    "lint": "next lint"
},

```

Luego ejecute por terminal: `npm run lint`, si no tiene errores debería observar por la terminal:

```bash
✔ No ESLint warnings or errors
```

> Hay un par de [reglas](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/main/docs/rules) cuando se usa atributos ARIA, y si es nuevo en la accesibilidad, puede ser difícil saber si los está utilizando correctamente. Puede usar este complemento para ayudarlo en el camino. 

### Mejora de la accesibilidad de formulario

Hay tres cosas que ya estamos haciendo para mejorar la accesibilidad en nuestros formularios:

- **HTML semántico:** usando elementos semánticos (`<input>`, `<option>`, etc.) en lugar de `<div>`. Esto permite que las tecnologías de asistencia (AT) se concentren en los elementos de entrada y proporcionen información contextual adecuada al usuario, lo que hace que el formulario sea más fácil de navegar y comprender.

- **Etiquetado - Labelling:** incluyendo `<label>` y el atributo `htmlFor` asegura que cada campo de formulario tenga una etiqueta de texto descriptiva. Esto mejora el soporte al proporcionar un contexto y también mejora la usabilidad al permitir a los usuarios hacer clic en la etiqueta para centrarse en el campo de entrada correspondiente.

- **Focus Outline:** los campos tienen adecuadamente el estilo para mostrar un esquema cuando están enfocados. Esto es crítico para la accesibilidad, ya que indica visualmente el elemento activo en la página, ayudando a los usuarios de lector de teclado y pantalla a comprender dónde están en el formulario. Puede verificar esto presionando `tab`.

Estas prácticas sientan una buena base para hacer que sus formularios sean más accesibles para muchos usuarios. Sin embargo, no abordan la validación y los errores de formulario.

### Validación de formulario

Vaya a http://localhost:3000/dashboard/invoices/create, y envíe un formulario vacío. ¿que sucede?

¡Recibes un error! Esto se debe a que está enviando valores de formulario vacíos a la acción de su servidor. Puede evitar esto validando su formulario en el cliente o en el servidor.

1. **Validación del lado del cliente**

Hay un par de formas en que puede validar los formularios en el cliente. El más simple sería confiar en la validación de formulario proporcionada por el navegador agregando el atributo requerido a los elementos `<input>` y `<select>` en sus formularios.

Este enfoque generalmente está bien porque algunos ATS admiten la validación del navegador.

Una alternativa a la validación del lado del cliente es la validación del lado del servidor.

2. **Validación del lado del servidor**

Al validar los formularios en el servidor, puede:

- Asegurarse de que sus datos estén en el formato esperado antes de enviarlos a su base de datos.

- Reducir el riesgo de que los usuarios maliciosos pasen por alto la validación del lado del cliente.

- Tener una fuente de verdad para lo que se considera datos válidos.

En su componente `create-form.tsx`, importe el gancho `useFormState` de React-Dom. Dado que `useFormState` es un hook, deberá convertir su formulario en un componente de cliente utilizando la directiva `"use client"`:

```tsx
'use client';
 
// ...
import { useFormState } from 'react-dom';
```

Dentro de su componente de formulario, el gancho `useFormState`:

- Toma dos argumentos: `(action, inicialState)`.
- Devuelve dos valores: `[state, dispatch]` el estado del formulario y una función de despacho (similar a `useReducer`)

Pase su acción `createInvoice` como un argumento de `useFormState`, y dentro de su `<form action={}>` use el dispatch.

El `initialState` puede ser cualquier cosa que define, en este caso, cree un objeto con dos claves vacías: `{ message: null, errors: {} }`

```tsx
// ...
import { useFormState } from 'react-dom';
 
export default function Form({ customers }: { customers: CustomerField[] }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createInvoice, initialState);
 
  return <form action={dispatch}>...</form>;
}
```
Esto puede parecer confuso inicialmente, pero tendrá más sentido una vez que actualice la acción del servidor. Hagamos eso ahora.

En su archivo `action.ts`, puede usar Zod para validar los datos de formulario. Actualice su InvoiceSchema de la siguiente manera:

```ts
const InvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});
```

- **customerId**: Zod ya lanza un error si el campo del cliente está vacío, ya que espera una cadena de tipo String. Pero agregemos un mensaje amigable si el usuario no selecciona un cliente.

- **amount:** dado que está coaccionando el tipo de cantidad de una cadena a otro, se predeterminará a cero si la cadena está vacía. Digamos que Zod siempre queremos la cantidad mayor que 0 con la función `gt()`

- **status:** Zod ya lanza un error si el campo de estado está vacío, ya que espera "pendiente" o "pagado". También agregemos un mensaje amigable si el usuario no selecciona un estado.

A continuación, actualice su acción createInvoice para aceptar dos parámetros:

```tsx
// This is temporary until @types/react-dom is updated
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};
 
export async function createInvoice(prevState: State, formData: FormData) {
  // ...
}
```

- **formData** - Igual que antes.
- **prevState** - Contiene el estado aprobado del hook `useFormState`. No lo usará en la acción en este ejemplo, pero es un accesorio requerido.

Luego, cambie la función Zod `parse()` a `safeParse()`

```tsx
export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  // ...
}
```

`safeParse()` devolverá un objeto que contenga un campo `succes` or `error`. Esto ayudará a manejar la validación con más gracia sin haber puesto esta lógica dentro del bloque de `try/catch`.

Antes de enviar la información a su base de datos, verifique si los campos de formulario se validaron correctamente con un condicional:

```tsx
export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
```

Si `validatedFields` no es exitoso, devolvemos los mensajes de error de Zod.

Finalmente, dado que está manejando la validación del formulario por separado, fuera de su bloque `try/catch`, puede devolver un mensaje específico para cualquier error de base de datos, su código final debería verse así:

```tsx
export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
 
  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
 
  // Insert data into the database
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
 
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
```

Genial, ahora mostremos los errores en su componente de formulario. De vuelta en el componente `create-form.tsx`, puede acceder a los errores utilizando el estado de formulario.

Agregue un operador ternario que verifique cada error específico. Por ejemplo, después del campo del cliente, puede agregar:

```tsx
<form action={dispatch}>
  <div className="rounded-md bg-gray-50 p-4 md:p-6">
    {/* Customer Name */}
    <div className="mb-4">
      <label htmlFor="customer" className="mb-2 block text-sm font-medium">
        Choose customer
      </label>
      <div className="relative">
        <select
          id="customer"
          name="customerId"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          defaultValue=""
          aria-describedby="customer-error"
        >
          <option value="" disabled>
            Select a customer
          </option>
          {customerNames.map((name) => (
            <option key={name.id} value={name.id}>
              {name.name}
            </option>
          ))}
        </select>
        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
      </div>
      {state.errors?.customerId ? (
        <div
          id="customer-error"
          aria-live="polite"
          className="mt-2 text-sm text-red-500"
        >
          {state.errors.customerId.map((error: string) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      ) : null}
    </div>
    // ...
  </div>
</form>
```

En el código anterior, también está agregando las siguientes etiquetas de ARIA:

`aria-describedby="customer-error"` esto establece una relación entre el elemento `select` y el contenedor de mensaje de error. Indica que el contenedor con `id="customer-error"` describe el `select`.Los lectores de pantalla leerán esta descripción cuando el usuario interactúe con el cuadro `select` para notificarlos de errores.

`id = "Customer-error"` este atributo de **id** identifica de manera única el elemento HTML que contiene el mensaje de error para la entrada Seleccionar. Esto es necesario para que `aria-describedby` estableca la relación.

`aria-live="polite"` el lector de pantalla debe notificar cortésmente al usuario cuándo se actualiza el error. Cuando el contenido cambia (por ejemplo, cuando un usuario corrige un error), el lector de pantalla anunciará estos cambios, pero solo cuando el usuario esté inactivo para no interrumpirlos.


### Práctica: Agregar etiquetas de aria

Usando el ejemplo anterior, agregue errores a sus campos de formulario restantes. También debe mostrar un mensaje en la parte inferior del formulario si falta algún campo. Tu interfaz de usuario debería verse así:

![Interfaz form create controlada mostrando errores](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Fform-validation-page.png&w=1080&q=75&dpl=dpl_3h1BESzeFKFcy7pGi2Svm9s7FMVm)

Si desea desafiarse, tome el conocimiento que ha aprendido en este capítulo y agregue la validación de formulario al componente `edit-form.tsx`.

Tendrás que:

- Agregue `useFormState` a su componente `edit-form.tsx`.
- Edite la acción `updateInvoice` para manejar los errores de validación de Zod.
- Muestre los errores en su componente y agregue aria labels para mejorar la accesibilidad.

> **/app/ui/invoices/edit-form.tsx**
```tsx
export default function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceForm;
  customers: CustomerField[];
}) {
  const initialState = { message: null, errors: {} };
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
  const [state, dispatch] = useFormState(updateInvoiceWithId, initialState);
 
  return <form action={dispatch}></form>;
}
```

> **/app/lib/actions.ts**
```tsx
export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }
 
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
 
  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
```

---

## Agregar autenticación

En el capítulo anterior, terminó de construir las rutas de facturas agregando validación de formulario y mejorando la accesibilidad. En este capítulo, agregaremos autenticación a nuestra aplicación. Para ello veremos:

- ¿Qué es la autenticación?

- Cómo agregar autenticación a su aplicación usando NextAuth.js.

- Cómo usar el middleware para redirigir a los usuarios y proteger sus rutas.

- Cómo usar el `useFormStatus` y` useFormState` de React para manejar los estados pendientes y form errors.

### ¿Qué es la autenticación?

La autenticación es una parte clave de muchas aplicaciones web hoy en día. Así es como un sistema verifica si el usuario es quién dice que es.

Un sitio web seguro a menudo utiliza múltiples formas de verificar la identidad de un usuario para obtener una seguridad mejorada. Por ejemplo, después de ingresar su nombre de usuario y contraseña, el sitio puede enviar un código de verificación a su dispositivo o usar una aplicación externa como Google Authenticator. Esta autenticación de 2 factores (2FA) ayuda a aumentar la seguridad. Incluso si alguien aprende su contraseña, no puede acceder a su cuenta sin su token único.

### Autenticación versus Autorización

En el desarrollo web, la autenticación y la autorización sirven para diferentes roles:

- La **autenticación** se trata de asegurarse de que el usuario sea quien dice que es. Estás demostrando su identidad con algo que tiene como un nombre de usuario y una contraseña.

- La **autorización** es el siguiente paso. Una vez que se confirma la identidad de un usuario, la autorización decide qué partes de la aplicación pueden usar.

Por lo tanto, las autenticación verifica que es usted, y la autorización determina a qué puede acceder o hacer en la aplicación.

### Creando la ruta de inicio de sesión

Comience por crear una nueva ruta en su aplicación llamada `/login` y use el siguiente código:

```tsx
import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
 
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
```

## NextAuth.js

Usaremos `nextAuth.js` para agregar autenticación a su aplicación. NextAuth.js abstrae gran parte de la complejidad involucrada en la gestión de sesiones, inicio y cierre de sesión, y otros aspectos de la autenticación. Si bien puede implementar manualmente estas funciones, el proceso puede llevar mucho tiempo y ser propenso a errores. NextAuth.js simplifica el proceso, proporcionando una solución unificada para Auth en las aplicaciones Next.js.

 - **Setting up NextAuth.js**
Establezcamos nextAuth.js en su proyecto. Ejecute el siguiente comando en su terminal: `npm install next-auth@beta bcrypt`

Aquí, está instalando la versión beta de NextAuth.js, que es compatible con Next.js 14. También está instalando bcrypt, que es una biblioteca que lo ayudará a hashear contraseñas.

A continuación, genere una clave secreta para su aplicación. Esta clave se utiliza para cifrar cookies, asegurando la seguridad de las sesiones de usuario. Puede hacer esto ejecutando el siguiente comando en su terminal: `openssl rand -base64 32`

Luego, en su archivo `.env`, notará dos variables: `AUTH_SECRET` and `AUTH_URL`.

Agregue su clave generada a `AUTH_SECRET`

```shell
AUTH_SECRET=your-secret-key
AUTH_URL=http://localhost:3000/api/auth
```

- **Adding the pages option**

Cree un archivo `auth.config.ts` en la raíz de nuestro proyecto que exporta un objeto `authConfig`. Este objeto contendrá las opciones de configuración para NextAuth.js. Por ahora, solo contendrá la opción de page:

```ts
import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
};
```

Puede usar la opción de páginas para especificar la ruta para páginas de inicio de sesión, cierre de sesión y error personalizado. No es necesario, pero si no lo proporciona, NextAuth.js usará sus default sign-in, sign-out, and error pages.
Al agregar `signIn: '/login'` en nuestra opción de páginas, el usuario será redirigido a nuestra página de inicio de sesión personalizada, en lugar de la página predeterminada de NextAuth.js.

- **Protección de sus rutas con el middleware Next.js**

A continuación, agregue la lógica para proteger sus rutas. Esto evitará que los usuarios accedan a las páginas del tablero a menos que se registren.

> /auth.config.ts
```ts
import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  providers: [],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
```

La **authorized callback** se utiliza para verificar si la solicitud está autorizada para acceder a una página a través de Next.js Middleware. Se llama antes de completar una solicitud, y recibe un objeto con las propiedades de `auth and request`. La propiedad de `Auth` contiene la sesión del usuario y la propiedad `request` contiene la solicitud entrante.

A continuación, deberá importar el objeto `authConfig` en un archivo de middleware. En la raíz de su proyecto, cree un archivo llamado `middleware.ts` y pegue el siguiente código:

```ts
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
 
export default NextAuth(authConfig).auth;
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.png).*)'],
};
```

Aquí está inicializando nextAuth.js con el objeto `authConfig` y exportando la propiedad de `auth`.También está utilizando la opción matcher desde el middleware para especificar que debe ejecutarse en rutas específicas.

La ventaja de emplear el middleware para esta tarea es que las rutas protegidas ni siquiera comenzarán a representar hasta que el middleware verifique la autenticación, mejorando tanto la seguridad como el rendimiento de su aplicación.

- **Password hashing**

Para almacenar contraseñas de forma segura, deberá hashearla. Este proceso convierte la contraseña en una cadena de caracteres de longitud fija, que parece aleatoria, proporcionando una capa de seguridad incluso si el hash está expuesto.

En su archivo `seed.js`, hemos utilizado byrypt para hash la contraseña antes de almacenarla en la base de datos. Puede usar byrypt para comparar que la contraseña ingresada por el usuario coincide con la de la base de datos.

Sin embargo, byrypt se basa en las API Node.js que no están disponibles en el middleware Next.js. Para resolver esto, deberá crear un archivo separado que importe byrypt. El nuevo archivo no se importará a su archivo de middleware.

Cree un nuevo archivo llamado `auth.ts` que difunda su objeto `authConfig`:

> /auth.ts
```ts
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
});
```

- **Adding Credentials provider**

A continuación, deberá agregar la opción de proveedores para nextAuth.js. `providers` es una matriz en la que enumera diferentes opciones de inicio de sesión como Google o GitHub. Para este curso, nos centraremos solo en usar el proveedor de [credenciales](https://authjs.dev/getting-started/providers/credentials-tutorial).

El proveedor de credenciales permite a los usuarios iniciar sesión con un nombre de usuario y una contraseña.

> /auth.ts
```ts
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [Credentials({})],
});
```

> Bueno saber: Aunque estamos utilizando el proveedor de credenciales, generalmente se recomienda utilizar proveedores alternativos como OAuth o proveedores de correo electrónico. Vea los documentos [NextAuth.js](https://authjs.dev/getting-started/providers) para obtener una lista completa de opciones.

Después de validar las credenciales, cree una nueva función `getUser` que consulte al usuario de la base de datos.

> /auth.ts
```ts
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
 
async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * from USERS where email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
        }
 
        return null;
      },
    }),
  ],
});
```

Luego, llame a `bcrypt.compare` para verificar si las contraseñas coinciden:

```ts
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
 
// ...
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        // ...
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
 
          if (passwordsMatch) return user;
        }
 
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
```

Finalmente, si las contraseñas coinciden, desea devolver al usuario, de lo contrario, devuelva `null` para evitar que el usuario inicie sesión.

### Actualización del formulario de inicio de sesión

Ahora necesita conectar la lógica de autenticación con su formulario de inicio de sesión. En su archivo `actions.ts`, cree una nueva acción llamada `authenticate`. Esta acción debe importar la función de firma de `auth.ts`:

```ts
import { signIn } from '@/auth';
 
// ...
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return 'CredentialSignin';
    }
    throw error;
  }
}
```

Si hay un error de 'credencialsignin', desea devolverlo para que pueda mostrar un mensaje de error apropiado.

Finalmente, en su componente `login-form.tsx`, puede usar `useFormState` para llamar a la acción del servidor y manejar errores de formulario, y usar `useFormStatus` para manejar el estado pendiente del formulario:

> /app/ui/login-form.tsx
```tsx
'use client';
 
import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';
 
export default function LoginForm() {
  const [code, action] = useFormState(authenticate, undefined);
 
  return (
    <form action={action} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <LoginButton />
        <div className="flex h-8 items-end space-x-1">
          {code === 'CredentialSignin' && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p aria-live="polite" className="text-sm text-red-500">
                Invalid credentials
              </p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
 
function LoginButton() {
  const { pending } = useFormStatus();
 
  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
```

### Agregar la funcionalidad de cierre de sesión

Para agregar la funcionalidad de cierre de sesión, llame a la función `signOut` desde `auth.ts` en su componente `<SideNav>`:

```tsx
import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
 
export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      // ...
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
```

**Pruébalo**
Ahora, pruébalo. Debería poder iniciar sesión y salir de su aplicación utilizando las siguientes credenciales:

- **Email:** *user@nextmail.com*
- **Password:** *123456*

---

## Agregar Metadatos

Los metadatos son cruciales para SEO y la habilidad de compartir. En este capítulo, discutiremos cómo puede agregar metadatos a su aplicación Next.js.

### ¿Qué son los metadatos?

En el desarrollo web, los metadatos proporcionan detalles adicionales sobre una página web. Los metadatos no son visibles para los usuarios que visitan la página. En cambio, funciona detrás de escena, incrustado dentro del HTML de la página, generalmente dentro del elemento `<head>`. Esta información oculta es crucial para los motores de búsqueda y otros sistemas que necesitan comprender mejor el contenido de su página web.

### ¿Por qué es importante los metadatos?

Los metadatos juegan un papel importante en la mejora del SEO de una página web, lo que lo hace más accesible y comprensible para los motores de búsqueda y las plataformas de redes sociales. Los metadatos adecuados ayudan a los motores de búsqueda a indexar de manera efectiva las páginas web, mejorando su clasificación en los resultados de búsqueda. Además, los metadatos como el og - `Open Graph` mejora la apariencia de enlaces compartidos en las redes sociales, lo que hace que el contenido sea más atractivo e informativo para los usuarios.

### Agregar metadatos

Next.js tiene una API de metadatos que se puede usar para definir los metadatos de su aplicación.Hay dos formas en que puede agregar metadatos a su aplicación:

1. Basado en la configuración: exporte un objeto de metadatos estáticos o una función dinámica `generateMetadata` en un archivo `layout` o `page`.

2. Basado en archivos: Next.js tiene un rango de archivos especiales se reconocen específicamente para fines de metadatos:

- **favicon.ico**, **apple-icon.jpg** e **icon.jpg**: utilizado para favicons e iconos.
- **opengraph-image.jpg** y **twitter-image.jpg**: empleado para imágenes de redes sociales.
- **robots.txt:** proporciona instrucciones para el rastreo de motores de búsqueda.
- **sitemap.xml:** ofrece información sobre la estructura del sitio web.

Tiene la flexibilidad de usar estos archivos para metadatos estáticos, o puede generarlos programáticamente dentro de su proyecto.

Con ambas opciones, Next.js generará automáticamente los elementos `<head>` relevantes para sus páginas.

### Favicon and Open Graph image

En su carpeta `/public`, notará que tiene dos imágenes: `favicon.ico` y `opengraph-image.jpg`.

Mueva estas imágenes a la raíz de su carpeta ``/app``.

Después de hacer esto, Next.js identificará y usará automáticamente estos archivos como su imagen favicon y OG. Puede verificar esto verificando el elemento `<head>` de su aplicación en herramientas de desarrollo.

> Bueno saber: también puede crear imágenes dinámicas de OG utilizando el [ImageResponse](https://nextjs.org/docs/app/api-reference/functions/image-response) constructor.

### Título y descripciones de la página

También puede incluir un objeto de metadatos de cualquier archivo de layout.js or page.js para agregar información de página adicional como título y descripción. Cualquier metadato en layout.js será heredado por todas las páginas que lo usen.

En su diseño de raíz, cree un nuevo objeto de metadatos con los siguientes campos:

```tsx
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Acme Dashboard',
  description: 'The official Next.js Course Dashboard, built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};
 
export default function Page() {
  // ...
}
```

Next.js agregará automáticamente el título y los metadatos a su aplicación.

Pero, ¿qué pasa si desea agregar un título personalizado para una página específica? Puede hacerlo agregando un objeto de metadatos a la página misma. Los metadatos en las páginas anidados anularán los metadatos en el padre.

Por ejemplo, en la página **/dashboard/invoices**, puede agregar el título de la página:

```tsx
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Invoices | Acme Dashboard',
};
```

Esto está bien, pero no es muy **DRY** (*Dont repeat yourself*). Está repitiendo el título de la aplicación en cada página, y si algo cambió, como el nombre de la compañía, tendría que actualizarlo en cada página.

En su lugar, puede usar el campo title.template en el objeto de metadatos para definir una plantilla para los títulos de su página. Esta plantilla puede incluir el título de la página y cualquier otra información que desee incluir.

En su diseño de raíz, actualice el objeto de metadatos para incluir una plantilla:

>/app/layout.tsx
```tsx
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};
```

El %s en la plantilla se reemplazará con el título de página específico.

Ahora, en su página de `/dashboard/invoices` puede agregar el título de la página:

```tsx
export const metadata: Metadata = {
  title: 'Invoices',
};
```

### Práctica: agregar metadatos

Ahora que ha aprendido sobre los metadatos, practique agregando títulos a sus otras páginas:

1. /login page.
2. /dashboard/ page.
3. /dashboard/customers page.
4. /dashboard/invoices/create page.
5. /dashboard/invoices/[id]/edit page.

La API de metadatos Next.JS es potente y flexible, lo que le brinda control total sobre los metadatos de su aplicación. Aquí, le hemos mostrado cómo agregar algunos metadatos básicos, pero puede agregar múltiples campos, incluidas palabras `keywords, robots, canonical `y más. Siéntase libre de explorar la documentación y agregar cualquier metadato adicional que desee a su aplicación.

---

## Próximos pasos

¡Felicidades! Ha completado el curso de Next.JS donde aprendió sobre las características principales de Next.js y las mejores prácticas para construir aplicaciones web.

Pero este es solo el comienzo: Next.js tiene muchas otras características. Está diseñado para ayudarlo a construir proyectos, su próxima idea o incluso aplicaciones a gran escala con su equipo.

Aquí hay algunos recursos para continuar explorando Next.js:

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Templates](https://vercel.com/templates?framework=next.js)
- [Next.js Repository](https://github.com/vercel/next.js)
- [Vercel YouTube](https://www.youtube.com/@VercelHQ/videos)
## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

## Creating a new project

```bash
npx create-next-app@latest nextjs-dashboard --use-npm --example "https://
github.com/vercel/next-learn/tree/main/dashboard/starter-example"

```

This command uses create-next-app, a Command Line Interface (CLI) tool that sets up a Next.js application for you. In the command above, you're also using the --example flag with the starter example for this course.

## Folder structure

**/app:** Contains all the routes, components, and logic for your application, this is where you'll be mostly working from.
**/app/lib:** Contains functions used in your application, such as reusable utility functions and data fetching functions.
**/app/ui:** Contains all the UI components for your application, such as cards, tables, and forms. To save time, we've pre-styled these components for you.
**/public:** Contains all the static assets for your application, such as images.
**/scripts/:** Contains a file that you'll use to populate your database in a later chapter.

Config Files: You'll also notice config files such as next.config.js at the root of your application. Most of these files are created and pre-configured when you start a new project using create-next-app.

**app/lib/placeholder-data.js:** Each JavaScript object in the file represents a table in your database. For example, for the invoices table:

**/app/lib/definitions.ts:** Here, we manually define the types that will be returned from the database.

By using **TypeScript**, you can ensure you don't accidentally pass the wrong data format to your components or database, like passing a string to amount instead of a number.

### If you're a TypeScript developer:

- Next.js detects if your project uses TypeScript and automatically installs the necessary packages and configuration. Next.js also comes with a TypeScript plugin for your code editor, to help with auto-completion and type-safety.

- We're manually declaring the data types, but for better type-safety, we recommend tools like Prisma, which automatically generates types based on your database schema.

## Running the development server

Run npm i or npm install to install the project's packages.

```bash
npm install
```

Followed by npm run dev to start the development server.

```bash
npm run dev
```

```npm run dev``` starts your Next.js development server on port 3000. Let's check to see if it's working. Open http://localhost:3000 on your browser.

## CSS Styling

In this chapter...

Here are the topics we’ll cover

- How to add a global CSS file to your application.

- Two different ways of styling: Tailwind and CSS modules.

- How to conditionally add class names with the clsx utility package.

### Global styles

**/app/ui:** If you look inside folder, you'll see a file called global.css. You can use this file to add CSS rules to all the routes in your application - such as CSS reset rules, site-wide styles for HTML elements like links, and more.

You can import global.css in any component in your application, but it's usually good practice to add it to your top-level component. In Next.js, this is the root layout (more on this later).

> **/app/layout.tsx**
```TypeScript
import '@/app/ui/global.css';
```

If you take a look inside global.css, you'll notice some @tailwind directives.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Tailwind

Tailwind is a CSS framework that speeds up the development process by allowing you to quickly write utility classes directly in your JSX markup. The CSS styles are shared globally, but each utility is singularly focused and applied to each individual element. This means you don't have to worry about style collisions, maintaining separate stylesheets, or your CSS bundle size growing as your application grows.

When you use create-next-app to start a new project, Next.js will ask if you want to use Tailwind. If you select yes, it will automatically install the necessary packages and configure Tailwind in your application.

If you look at /app/page.tsx, you'll see that we're using Tailwind classes in the example.

```tsx
<div className="h-0 w-0 border-b-[30px] border-l-[20px] border-r-[20px] border-b-black border-l-transparent border-r-transparent"/>
```

### CSS Modules

If you prefer writing traditional CSS rules or keeping your styles separate from your JSX, CSS Modules are a great alternative.

CSS Modules allow you to scope CSS to a component by automatically creating unique class names, so you don't have to worry about name collisions.

Here's how you could create the same shape from the quiz above using CSS modules.

> **app/ui/home.module.css**
```css
.shape {
  height: 0;
  width: 0;
  border-bottom: 30px solid black;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}
```

> Provide a way to make CSS classes locally scoped to components by default, enabling better modularity and reducing the risk of styling conflicts.

### Library clsx

There may be cases where you may need to conditionally style an element based on state or some other condition.

- Suppose that you want to create an InvoiceStatus component which accepts status. The status can be 'pending' or 'paid'.
- If it's 'paid', you want the color to be green. If it's 'pending', you want the color to be gray.

You can use clsx to conditionally apply the classes, like this:

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

## Optimizing Fonts and Images

In the previous chapter, you learned how to style your Next.js application. Let's continue working on your home page by adding a custom font and a hero image.

In this chapter...

Here are the topics we’ll cover

- ✏️ How to add custom fonts with next/font.

- 🛣️ How to add images with next/image.

- ✅ How fonts and images are optimized in Next.js.


### Why optimize fonts?

Fonts play a significant role in the design of a website, but using custom fonts in your project can affect performance if the font files need to be fetched and loaded.

Cumulative Layout Shift is a metric used by Google to evaluate the performance and user experience of a website. With fonts, layout shift happens when the browser initially renders text in a fallback or system font and then swaps it out for a custom font once it has loaded. This swap can cause the text size, spacing, or layout to change, shifting elements around it.

![Cumulative Layout Shift](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Ffont-layout-shift.png&w=1920&q=75&dpl=dpl_9EKEbD7jAviauyTffgoEyAkQSGtP)

Next.js automatically optimizes fonts in the application when you use the next/font module. It does so by downloading font files at build time and hosting them with your other static assets. This means when a user visits your application, there are no additional network requests for fonts which would impact performance.

### Adding a primary font

In your /app/ui folder, create a new file called fonts.ts. You'll use this file to keep the fonts that will be used throughout your application.

Import the Inter font from the next/font/google module - this will be your primary font.
Then, specify what subset you'd like to load. In this case, 'latin':

```tsx
import { Inter } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });
```

Finally, add the font to the <body> element in /app/layout.tsx

By adding Inter to the <body> element, the font will be applied throughout your application. Here, you're also adding the Tailwind antialiased class which smooths out the font. It's not necessary to use this class, but it adds a nice touch to your fonts.

```css
.antialiased {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
```

```tsx
<body className={`${inter.className} antialiased`}>{children}</body>
```

> You can also add fonts to specific elements of your application.

---

### Why optimize images?

Next.js can serve static assets, like images, under the top-level /public folder. Files inside /public can be referenced in your application.

If you look inside the folder, you'll see there's are two images: hero-desktop.png and hero-mobile.png. These two images are completely different, and they'll be shown depending on the user's device is a desktop or mobile.

With regular HTML, you would add an image as follows:

```tsx
    <img src="/hero.png" alt="Screenshots of the dashboard project showing desktop and mobile versions"/>
```

However, this means you have to manually:

- Ensure your image is responsive on different screen sizes.
- Specify image sizes for different devices.
- Prevent layout shift as the images load.
- Lazy load images that are outside the user's viewport.

Instead of manually handling these optimizations, you can use the ```next/image``` component to automatically optimize your images.

### The \<Image\> component

The \<Image\> Component is an extension of the HTML \<img\> tag, and comes with automatic image optimization, such as:

- Preventing layout shift automatically when images are loading.
- Resizing images to avoid shipping large images to devices with a smaller viewport.
- Lazy loading images by default (images load as they enter the viewport).
- Serving images in modern formats, like WebP and AVIF, when the browser supports it.

### Adding the desktop hero image

Let's swap the \<img\> tag for an \<Image\> component.

In your /app/page.tsx file, import the component from next/image. Then, add the image under the comment:

```tsx
    <Image
        src="/hero-desktop.png"
        width={1000}
        height={760}
        className="hidden md:block"
        alt="Screenshots of the dashboard project showing desktop and mobile versions"
    />
```

Here, you're setting the width to 1000 and height to 760 pixels. It's good practice to set the width and height of your images to avoid layout shift, these should be an aspect ratio identical to the source image.

### Adding the mobile hero image

Now it's your turn again! Under the image you've just added, add another <Image> component for the mobile hero.

- The image should have a width of 560 and height of 620 pixels.
- It should be shown on mobile screens, and hidden on desktop.
- You can use Dev Tools to check if the desktop and mobile images are swapped correctly.

```tsx
    <Image
        src="/hero-mobile.png"
        width={560}
        height={620}
        className="block md:hidden"
        alt="Screenshot of the dashboard project showing mobile version"
    />
```

### Recommended reading

There's a lot more to learn about these topics, including optimizing remote images and using local font files. If you'd like to dive deeper into fonts and images, see:

- [Image Optimization Docs](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Font Optimization Docs](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [Improving Web Performance with Images (MDN)](https://developer.mozilla.org/en-US/docs/Learn/Performance/Multimedia)
- [Web Fonts (MDN)](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Web_fonts)


---

## Creating Layouts and Pages

So far, your application only has a home page. Let's learn how you can create more routes with layouts and pages.

In this chapter...

Here are the topics we’ll cover

- Create the /login and dashboard pages using file-system routing.

- Understand the role of folders and files when creating new route segments.

- Create a layout that can be shared between multiple dashboard pages.

- Understand what colocation, partial rendering, and root layout are.

### Nested routing

Next.js uses **file-system routing** where folders are used to create nested routes. Each folder represents a route segment that maps to a URL segment.

![Nested routing](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Ffolders-to-url-segments.png&w=1920&q=75&dpl=dpl_9EKEbD7jAviauyTffgoEyAkQSGtP)

page.tsx is a special Next.js file that exports a React component containing the UI for the route. In your application, you already have a page file: /app/page.tsx - this is the home page which is associated with the route /.

To create a nested route, you can nest folders inside each other with their own page.tsx files. For example:

![Nest folders inside](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Flogin-route.png&w=1920&q=75&dpl=dpl_9EKEbD7jAviauyTffgoEyAkQSGtP)

/app/login/page.tsx is associated with the /login path. Let's create the page to see how it works!

### Creating the dashboard page

Create a new folder called dashboard inside /app. Then, create a new page.tsx file inside the dashboard folder with the following content:

```tsx
export default function Page() {
  return <p>Dashboard Page</p>;
}
```
Now, make sure that the development server is running and visit http://localhost:3000/dashboard.

Let's practice creating more routes. In your dashboard, create two more pages:

- Customers Page: The page should be accessible on http://localhost:3000/dashboard/customers. For now, it should return a \<p\>Customers Page\</p\> element.

- Invoices Page: The invoices page should be accessible on http://localhost:3000/dashboard/invoices. For now, also return a \<p\>Invoices Page\</p\> element.

You should have the following folder structure:

![folder structure](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Frouting-solution.png&w=1920&q=75&dpl=dpl_9EKEbD7jAviauyTffgoEyAkQSGtP)


### Creating the dashboard layout

Dashboards also have some sort of navigation that is shared across multiple pages. In Next.js, you can use a special layout.tsx file to create UI that is shared between multiple pages. Let's create a layout for the dashboard!

Inside the /dashboard folder, add a new file called layout.tsx and paste the following code:

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

One benefit of using layout is that on navigation, only the page components update while the layout won't re-render. In Next.js, this is called partial rendering:

![Partial rendering](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Fpartial-rendering-dashboard.png&w=1920&q=75&dpl=dpl_9EKEbD7jAviauyTffgoEyAkQSGtP)

This layout is required and is called a root layout. Any UI you add to the root layout will be shared across all pages in your application. You can use the root layout to modify your \<html\> and \<body\> tags, and add metadata (you'll learn more about metadata in a later chapter).

Since the new layout you've just created (/app/dashboard/layout.tsx) is unique to the dashboard pages, you don't need to add any UI to the root layout above.


## Navigating Between Pages

In the previous chapter, you created the dashboard layout and pages. Now, let's add some links to allow users to navigate between the dashboard pages.

In this chapter...

Here are the topics we’ll cover

- How to use the next/link component.

- How to show an active link with the usePathname() hook.

- How client-side navigation works in Next.js.

### Why optimize navigation?

To link between pages, you'd traditionally use the \<a\> HTML element. At the moment, the sidebar links use \<a\> elements, but notice what happens when you navigate between the home, invoices, and customers pages on your browser.

Did you see it?

There's a full page refresh on each page navigation!

#### The \<Link\> component

In Next.js, you can use the Link Component to link between pages in your application. <Link> allows you to do client-side navigation with JavaScript. Although parts of your application are rendered on the server, navigation is faster and there's no full page refresh - making it feel more like a web app.

#### Pattern: Showing active links

A common UI pattern is to show an active link to indicate to the user what page they are currently on. To do this, you need to get the user's current path from the URL. Next.js provides a hook called usePathname() that you can use to check the path.

Since [usePathname()](https://nextjs.org/docs/app/api-reference/functions/use-pathname) is a hook, you'll need to turn nav-links.tsx into a Client Component. Add React's ```"use client" ``` directive to the top of the file, then import usePathname() from next/navigation:

### Automatic code-splitting and prefetching

In addition to client-side navigation, Next.js automatically code splits your application by route segments. This is different from a traditional SPA, where the browser loads all your application code on initial load.

Splitting code by routes means that pages become isolated. If a certain page throws an error, the rest of the application will still work.

Furthermore, in production, whenever \<Link\> components appear in the browser's viewport, Next.js automatically prefetches the code for the linked route in the background. By the time the user clicks the link, the code for the destination page will already be loaded in the background, and the page transition will be near-instant!

---

## Setting Up Your Database

Before you can continue working on your dashboard, you'll need some data. In this chapter, you'll be setting up a PostgreSQL database using @vercel/postgres. If you're already familiar with PostgreSQL and would prefer to use your own provider, you can skip this chapter and set it up on your own. Otherwise, let's continue!

In this chapter...

Here are the topics we’ll cover

- Create and link your project to a Postgres database.

- Seed the database with initial data.

### Create a Postgres database

Next, to set up a database, click the Storage tab from your Vercel dashboard. Select Connect Store → Create New → Postgres → Continue.

![Vercel Postgres](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Fcreate-database.png&w=1080&q=75&dpl=dpl_9qQQdh4D2Yn6grRGdiVN5fQKpqX7)

Once connected, copy the contents from the .env.local tab on the database page.

![env.local](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Fdatabase-dashboard.png&w=1080&q=75&dpl=dpl_9qQQdh4D2Yn6grRGdiVN5fQKpqX7)

Navigate to your code editor and rename the .env.example file to .env. Paste in the copied contents from Vercel.

Important: Go to your .gitignore file and make sure .env are in the ignored files to prevent your database secrets from being exposed on GitHub.

Finally, run:
```bash 
npm i @vercel/postgres
```
in your terminal to install the Vercel Postgres SDK.

### Seed your database

Now that your database has been created, let's seed it with some initial data. This will allow you to have some data to work with as you build the dashboard.

In the ```/scripts``` folder of your project, there's a file called seed.js. This script contains the instructions for creating and seeding the invoices, customers, user, revenue tables.

```json
"scripts": {
  "build": "next build",
  "dev": "next dev",
  "start": "next start",
  "seed": "node -r dotenv/config ./scripts/seed.js"
},
```

-r : require

This is the command that will execute the seed.js. Before we can run the command, we must first npm i bcrypt, which is used to hash user passwords.

Now, run npm run seed. You should see some console.log messages in your terminal to let you know the script is running.

> Troubleshooting:
>
> If you run into any issues while seeding your database and want to run the script again, you can drop any existing tables by running DROP TABLE tablename in your database query interface. See the executing queries section below for more details.
>
> This command will delete the tables and all their data. But be careful, it's ok to do this with your example app since you're working with placeholder data, but you shouldn't run this command in a production app.
>
> If you continue to experience issues while seeding your Verce Postgres database, please open a discussion on GitHub.

### Exploring your database

Let's see what your database looks like. Go back to Vercel, and click Data in the sidenav.

In this section, you'll find the four new tables: users, customers, invoices, revenue.

![Data postgres Vercel](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Fdatabase-tables.png&w=1080&q=75&dpl=dpl_9qQQdh4D2Yn6grRGdiVN5fQKpqX7)

### Executing queries

You can switch to the "query" tab to interact with your database. This section supports standard SQL commands. For instance, inputting DROP TABLE customers will delete "customers" table along with all its data - so be careful!
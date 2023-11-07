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

---

## Fetching Data

Let's discuss the different ways you can fetch data from your database, including using SQL and alternatives.

Now that you've created and seeded your database, let's discuss the different ways you can fetch data for your application, and choose the most appropriate one for the dashboard overview page.

In this chapter...

Here are the topics we’ll cover

- Learn about some approaches to fetching data: APIs, ORMs, SQL, etc.

- How Server Components help us access our back-end resources more securely.

- What network waterfalls are.

- How to implement parallel data fetching using a JavaScript Pattern.

### Choosing how to fetch data

#### API layer
APIs are an intermediary layer between your application code and database. There are a few cases where you might use an API:

If you're using 3rd party services that provide an API.
If you're fetching data from the client, you want to have an API layer that runs on the server to avoid exposing your database secrets to the client.
In Next.js, you can create API endpoints using Route Handlers.

#### Database queries
When you're creating a full-stack application, you'll also need to write logic to interact with your database. For relational databases like Postgres, you can do this with SQL, or an ORM like Prisma.

There are a few cases where you have to write database queries:

When creating your API endpoints, you need to write logic to interact with your database.
If you are using React Server Components (fetching data on the server), you can skip the API layer, and query your database directly without risking exposing your database secrets to the client.

There are a few other ways you can fetch data with React and Next.js. We won't cover all of them due to time. If you'd like to learn more, check out the Data Fetching docs.

In the next section, we'll explore how you can fetch data using a relatively new approach: async React Server Components.

### Using Server Components to fetch data

By default, Next.js applications use React Server Components, and you can opt into Client Components when needed. There are a few benefits to fetching data with React Server Components:

Server Components execute on the server, so you can keep expensive data fetches and logic on the server and only send the result to the client.
Server Components support promises, providing a simpler solution for asynchronous tasks like data fetching. You can use async/await syntax without reaching out for useEffect, useState or data fetching libraries.
Since Server Components execute on the server, you can query the database directly without an additional API layer.

### Using SQL

For your dashboard project, you'll write database queries using the Vercel Postgres SDK and SQL. There are a few reasons why we'll be using SQL:

- SQL is the industry standard for querying relational databases (e.g. ORMs generate SQL under the hood).

- Having a basic understanding of SQL can help you understand the fundamentals of relational databases, allowing you to apply your knowledge to other tools.

- SQL is versatile, allowing you to fetch and manipulate specific data.

- The Vercel Postgres SDK provides protection against SQL injections.

> You can call sql inside any Server Component. But to allow you to navigate the components more easily, we've kept all the data queries in the data.ts file, and you can import them into the components.

## Fetching data for the dashboard overview page

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

In the code above:

Page is an async component. This allows you to use await to fetch data.
There are also 3 components which receive data: \<Card\>, \<RevenueChart\>, and \<LatestInvoices\>. They are currently commented out to prevent the application from erroring.

### Fetching data for \<RevenueChart/\>

To fetch data for the \<RevenueChart/\> component, import the fetchRevenue function from data.ts and call it inside your component

### Fetching data for \<LatestInvoices/\>

For the <LatestInvoices /> component, we need to get the latest 5 invoices, sorted by date.

You could fetch all the invoices and sort through them using JavaScript. This isn't a problem as our data is small, but as your application grows, it can significantly increase the amount of data transferred on each request and the JavaScript required to sort through it.

Instead of sorting through the latest invoices in-memory, you can use an SQL query to fetch only the last 5 invoices.

For example, this is the SQL query from your data.ts file:

```tsx
// Fetch the last 5 invoices, sorted by date
const data = await sql<LatestInvoiceRaw>`
  SELECT invoices.amount, customers.name, customers.image_url, customers.email
  FROM invoices
  JOIN customers ON invoices.customer_id = customers.id
  ORDER BY invoices.date DESC
  LIMIT 5`;
```

### Fetch data for the \<Card\> components

Now it's your turn to fetch data for the \<Card\> components. The cards will display the following data:

- Total amount of invoices collected.
- Total amount of invoices pending.
- Total number of invoices.
- Total number of customers.

Again, you might be tempted to fetch all the invoices and customers, and use JavaScript to manipulate the data.

```tsx
const totalInvoices = allInvoices.length;
const totalCustomers = allCustomers.length;
```

But with SQL, you can fetch only the data you need. It's a little longer than using Array.length, but it means less data needs to be transferred during the request. This is the SQL alternative:

> /app/lib/data.ts
```tsx
const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
```

The function you will need to import is called fetchCardData. You will need to destructure the values returned from the function.

Hint:

- Check the card components to see what data they need.
- Check the data.ts file to see what the function returns.

Great! You've now fetched all the data for the dashboard overview page. Your page should look like this:

![Dashboard Data Fetching](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Fcomplete-dashboard.png&w=1080&q=75&dpl=dpl_9qQQdh4D2Yn6grRGdiVN5fQKpqX7)


However... there are two things you need to be aware of:

1. The data requests are unintentionally blocking each other, creating a request waterfall.

2. By default, Next.js prerenders routes to improve performance, this is called Static Rendering. So if your data changes, it won't be reflected in your dashboard.

## Request Waterfalls

What are request waterfalls?

A "waterfall" refers to a sequence of network requests that depend on the completion of previous requests. In the case of data fetching, each request can only begin once the previous request has returned data.

For example, we need to wait for fetchRevenue() to execute before fetchLatestInvoices() can start running, and so on.

This pattern is not necessarily bad. There may be cases where you want waterfalls because you want a condition to be satisfied before you make the next request. For example, you might want to fetch a user's ID and profile information first. Once you have the ID, you might then proceed to fetch their list of friends. In this case, each request is contingent on the data returned from the previous request.

However, this behavior can also be unintentional and impact performance.

## Parallel data fetching

A common way to avoid waterfalls is to initiate all data requests at the same time - in parallel.

In JavaScript, you can use the Promise.all() or Promise.allSettled() functions to initiate all promises at the same time. For example, in data.ts, we're using Promise.all() in the fetchCardData() function.

> Good to know:
>
> With Promise.allSettled(), you can also return an array of objects with status and value keys, so can check a promise's status is fulfilled or rejected before passing the value to your component. It's useful if you want to handle errors more gracefully.

By using this pattern, you can:

- Start executing all data fetches at the same time, which can lead to performance gains.
- Use a native JavaScript pattern that can be applied to any library or framework.

However, there is one disadvantage of using this JavaScript pattern: what happens if one data request is slower than all the others?

---

## Static and Dynamic Rendering

Learn about how you can use to further optimize data fetching with PPR and Streaming.

> ⚠️ This chapter contains Next.js 14 experimental features that are subject to change. The content may be updated as the features are finalized.

In the previous chapter, you fetched data for the Dashboard Overview page. However, we briefly discussed two limitations of the current setup:

1. The data requests are creating an unintentional waterfall.
2. The dashboard is static, so any data updates will not be reflected on your application.

In this chapter...

Here are the topics we’ll cover

- What static rendering is and how it can improve your application's performance.

- What dynamic rendering is and when to use it.

- Different approaches to make your dashboard dynamic.

- The limitation of fetching data at request time.

### What is Static Rendering?

With static rendering, data fetching and rendering happens on the server at build time (when you deploy) or during revalidation. The result can then be distributed and cached (stored) in a Content Delivery Network (CDN).

![CDN](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Fstatic-site-generation.png&w=1920&q=75&dpl=dpl_7RpAeq75qgcdEqm8L4GS5sRJ7t3C)

Whenever a user visits your application, the cached result is served. There are a couple of benefits of static rendering:

Faster Websites - Prerendered content can be cached. This ensures that users around the world can access your website's content more quickly and reliably.
Reduced Server Load - Because the content is cached, your server does not have to dynamically generate content for each user request.
SEO - Prerendered content is easier for search engine crawlers to index, as the content is already available when the page loads. This can lead to improved search engine rankings.
Static rendering is useful for UI with no data or data that is shared across users, such as a static blog post or a product page. It might not be a good fit for a dashboard that has data that is regularly updated.

The opposite of static rendering is dynamic rendering.

### What is Dynamic Rendering?

With dynamic rendering, content is rendered on the server for each user at request time (when the user visits the page). There are a couple of benefits of dynamic rendering:

- Real-Time Data - Dynamic rendering allows your application to display real-time or frequently updated data. This is ideal for applications where data changes often.

- User-Specific Content - It's easier to serve user-specific content, such as personalized dashboards or user profiles, through dynamic rendering, as the data is updated based on user interaction.

- Request Time Information - Dynamic rendering allows you to access information that can only be known at request time, such as cookies or the URL search parameters.

## Making the dashboard dynamic

By default, @vercel/postgres doesn't set its own caching semantics. This allows the framework to set its own static and dynamic behavior.

You can use a Next.js API called unstable_noStore inside your Server Components or data fetching functions to opt out of static rendering. Let's add this.

In your data.ts, import unstable_noStore from next/cache, and call it the top of your data fetching functions:

```tsx
// ...
import { unstable_noStore as noStore } from 'next/cache';
 
export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
 
  // ...
}
```

> Note: unstable_noStore is an experimental API and may change in the future. If you prefer to use a stable API in your own projects, you can also use the Segment Config Option export const dynamic = "force-dynamic".

### Simulating a Slow Data Fetch

Making the dashboard dynamic is a good first step. However... there is still one problem we mentioned in the previous chapter. What happens if one data request is slower than all the others?

Let's simulate a slow data fetch to see what happens. In your data.ts file, uncomment the console.log and setTimeout inside fetchRevenue():

```tsx
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

Here, you've added an artificial 3-second delay to simulate a slow data fetch. The result is that now your whole page is blocked while the data is being fetched.

![data fetch blocking](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Fsequential-parallel-data-fetching.png&w=1920&q=75&dpl=dpl_7RpAeq75qgcdEqm8L4GS5sRJ7t3C)

Which brings us to a common challenge developers have to solve:

With dynamic rendering, your application is only as fast as your slowest data fetch.

## Streaming

In the previous chapter, you made your dashboard page dynamic, however, we discussed how the slow data fetches can impact the performance of your application. Let's look at how you can improve the user experience when there are slow data requests.

In this chapter...

Here are the topics we’ll cover

- What streaming is and when you might use it.

- How to implement streaming with loading.tsx and Suspense.

- What loading skeletons are.

- What route groups are, and when you might use them.

- Where to place Suspense boundaries in your application.

### What is streaming?

Streaming is a data transfer technique that allows you to break down a route into smaller "chunks" and progressively stream them from the server to the client as they become ready.

By streaming, you can prevent slow data requests from blocking your whole page. This allows the user to see and interact with parts of the page without waiting for all the data to load before any UI can be shown to the user.

Data fetching and rendering are initiated in parallel, so the user can see the UI as it becomes ready. This is different from the traditional waterfall approach, where data fetching and rendering are initiated sequentially, blocking the UI from rendering until all the data is ready.

![Project example streaming](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Fserver-rendering-with-streaming-chart.png&w=1920&q=75&dpl=dpl_7RpAeq75qgcdEqm8L4GS5sRJ7t3C)

Streaming works well with React's component model, as each component can be considered a chunk.

There are two ways you implement streaming in Next.js:

1. At the page level, with the loading.tsx file.
2. For specific components, with \<Suspense\>.

Let's see how this works.

A few things are happening here:

1. loading.tsx is a special Next.js file built on top of Suspense, it allows you to create loading UI to show as a replacement while page content loads.
2. Since <Sidebar> is static, it's shown immediately. The user can interact with <Sidebar> while the dynamic content is loading.
3. The user doesn't have to wait for the page to finish loading before navigating away (this is called interruptable navigation).

Congratulations! You've just implemented Streaming with Next.js!

But we can do more to improve the user experience. Let's show a skeleton instead of the Loading… text.

### Adding loading skeletons
A loading skeleton is a simplified version of the UI. Many websites use them as a placeholder (or fallback) to indicate to users that the content is loading. Any UI you embed into loading.tsx will be embedded as part of the static file, and sent first. Then, the rest of the dynamic content will be streamed in from the server to the client.

Inside your loading.tsx file, import a new component called \<DashboardSkeleton\>

![Dashboard skeleton](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Floading-page-with-skeleton.png&w=1080&q=75&dpl=dpl_7RpAeq75qgcdEqm8L4GS5sRJ7t3C)

### Fixing the loading skeleton bug with route groups

Right now, your loading skeleton will apply to the invoices and customers pages as well.

Since loading.tsx is a level higher than /invoices/page.tsx and /customers/page.tsx in the file system, it's also applied to those pages.

We can change this with Route Groups. Create a new folder called /(overview) inside the dashboard folder. Then, move your loading.tsx and page.tsx files inside the folder:

![Route groups /(overview)](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Froute-group.png&w=1920&q=75&dpl=dpl_7RpAeq75qgcdEqm8L4GS5sRJ7t3C)

Now, the loading.tsx file will only apply to your dashboard overview page.

Route groups allow you to organize files into logical groups without affecting the URL path structure. When you create a new folder using parentheses (), the name won't be included in the URL path. So /dashboard/(overview)/page.tsx becomes /dashboard.

Here, you're using a route group to ensure loading.tsx only applies to your dashboard overview page. However, you can also use route groups to separate your application into sections (e.g. (marketing) routes and (dashboard) routes) or by teams for larger applications.

## Streaming a component

So far, you're streaming a whole page. But, instead, you can be more granular and stream specific components using React Suspense.

Suspense allows you to defer rendering parts of your application until some condition is met (e.g. data is loaded). You can wrap your dynamic components in Suspense. Then, pass it a fallback component to show while the dynamic component loads.

If you remember the slow data request, fetchRevenue(), this is the request that is slowing down the whole page. Instead of blocking your page, you can use Suspense to stream only this component and immediately show the rest of the page's UI.

To do so, you'll need to move the data fetch to the component.

Finally, update the \<RevenueChart\> component to fetch its own data and remove the prop passed to it.

Now refresh the page, you should see the dashboard information almost immediately, while a fallback skeleton is shown for \<RevenueChart\>

![Dashboard skeleton Streaming](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Floading-revenue-chart.png&w=1080&q=75&dpl=dpl_7RpAeq75qgcdEqm8L4GS5sRJ7t3C)

Practice: Streaming \<LatestInvoices\>
Now it's your turn! Practice what you've just learned by streaming the \<LatestInvoices\> component.

Move fetchLatestInvoices() down from the page to the \<LatestInvoices\> component. Wrap the component in a \<Suspense\> boundary with a fallback called \<LatestInvoicesSkeleton\>.

## Grouping components

Great! You're almost there, now you need to wrap the \<Card\> components in Suspense. You can fetch data for each individual card, but this could lead to a popping effect as the cards load in, this can be visually jarring for the user.

> So, how would you tackle this problem?

To create more of a staggered effect, you can group the cards using a wrapper component. This means the static \<Sidebar/\> will be shown first, followed by the cards, etc.

In your page.tsx file:

1. Delete your \<Card\> components.
2. Delete the fetchCardData() function.
3. Import a new wrapper component called \<CardWrapper /\>.
4. Wrap \<CardWrapper /\> in Suspense.

### Deciding where to place your Suspense boundaries

Where you place your Suspense boundaries will depend on a few things:

1. How you want the user to experience the page as it streams.
2. What content you want to prioritize.
3. If the components rely on data fetching.

Take a look at your dashboard page, is there anything you would've done differently?

- You could stream the whole page like we did with loading.tsx... but that may lead to a longer loading time if one of the components has a slow data fetch.
- You could stream every component individually... but that may lead to UI popping into the screen as it becomes ready.
- You could also create a staggered effect by streaming page sections. But you'll need to create wrapper components.

Where you place your suspense boundaries will vary depending on your application. In general, it's good practice to move your data fetches down to the components that need it, and then wrap those components in Suspense. But there is nothing wrong with streaming the sections or the whole page if that's what your application needs.

Don't be afraid to experiment with Suspense and see what works best, it's a powerful API that can help you create more delightful user experiences.

---

## Partial Prerendering (Optional)

Partial Prerendering is an experimental feature introduced in Next.js 14. The content of this page may be updated as the feature progresses in stability. You may want to skip this chapter if you prefer to not use experimental features. This chapter is not required to complete the course.

In this chapter...

Here are the topics we’ll cover

- What Partial Prerendering is.

- How Partial Prerendering works.

### Combining Static and Dynamic Content

Currently, if you call a dynamic function inside your route (e.g. noStore(), cookies(), etc), your whole route becomes dynamic.

This aligns with how most web apps are built today, you either choose between static and dynamic rendering for your entire application or for specific routes.

However, most routes are not fully static or dynamic. You may have a route that has both static and dynamic content. For example, let's say you have a social media feed, the posts would be static, but the likes for the post would be dynamic. Or an ecommerce site, where the product details are static, but the user's cart is dynamic.

Going back to your dashboard page, what components would you consider static vs. dynamic?

![Dashboard Combining Static and Dynamic Content](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Fdashboard-static-dynamic-components.png&w=1920&q=75&dpl=dpl_7RpAeq75qgcdEqm8L4GS5sRJ7t3C)

### What is Partial Prerendering?

In Next.js 14, there is a preview of a new compiler optimization called Partial Prerendering. Partial Prerendering is an experimental feature that allows you to render a route with a static loading shell, while keeping some parts dynamic. In other words, you can isolate the dynamic parts of a route.

![Example partial prerendering](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Fthinking-in-ppr.png&w=1920&q=75&dpl=dpl_7RpAeq75qgcdEqm8L4GS5sRJ7t3C)

When a user visits a route:

- A static route shell is served, this makes the initial load fast.
- The shell leaves holes where dynamic content will load in async.
- The async holes is loaded in parallel, reducing the overall load time of the page.

This is different from how your application behaves today, where entire routes are either fully static or dynamic.

### How does Partial Prerendering work?

Partial Prerendering leverages React's Concurrent APIs and uses Suspense to defer rendering parts of your application until some condition is met (e.g. data is loaded).

The fallback is embedded into the initial static file along with other static content. At build time (or during revalidation), the static parts of the route are prerendered, and the rest is postponed until the user requests the route.

The great thing about Partial Prerendering is that you don't need to change your code to use it. As long as you're using Suspense to wrap the dynamic parts of your route, Next.js will know which parts of your route are static and which are dynamic.

## Summary

To recap, you've done a few things to optimize data fetching in your application, you've:

1. Created a database in the same region as your application code to reduce latency between your server and database.
2. Fetched data on the server with React Server Components. This allows you to keep expensive data fetches and logic on the server, reduces the client-side JavaScript bundle, and prevents your database secrets from being exposed to the client.
3. Used SQL to only fetch the data you needed, reducing the amount of data transferred for each request and the amount of JavaScript needed to transform the data in-memory.
4. Parallelize data fetching with JavaScript - where it made sense to do so.
5. Implemented Streaming to prevent slow data requests from blocking your whole page, and to allow the user to start interacting with the UI without waiting for everything to load.
6. Move data fetching down to the components that need it, thus isolating which parts of your routes should be dynamic in preparation for Partial Prerendering.

---

## Adding Search and Pagination

In the previous chapter, you improved your dashboard's initial loading performance with streaming. Now let's move on to the /invoices page, and learn how to add search and pagination!

In this chapter...

Here are the topics we’ll cover

- Learn how to use the Next.js APIs: searchParams, usePathname, and useRouter.

- Implement search and pagination using URL search params.

### /dashboard/invoices/page.tsx

Spend some time familiarizing yourself with the page and the components you'll be working with:

\<Search/\> allows users to search for specific invoices.
\<Pagination/\> allows users to navigate between pages of invoices.
\<Table/\> displays the invoices.

Your search functionality will span the client and the server. When a user searches for an invoice on the client, the URL params will be updated, data will be fetched on the server, and the table will re-render on the server with the new data.

### Why use URL search params?

As mentioned above, you'll be using URL search params to manage the search state. This pattern may be new if you're used to doing it with client side state.

There are a couple of benefits of implementing search with URL params:

- Bookmarkable and Shareable URLs: Since the search parameters are in the URL, users can bookmark the current state of the application, including their search queries and filters, for future reference or sharing.
- Server-Side Rendering and Initial Load: URL parameters can be directly consumed on the server to render the initial state, making it easier to handle server rendering.
- Analytics and Tracking: Having search queries and filters directly in the URL makes it easier to track user behavior without requiring additional client-side logic.

### Adding the search functionality

There are three Next.js client hooks that you'll use to implement the search functionality:

- **useSearchParams** Allows you to access the parameters of the current URL. For example, the search params for this URL /dashboard/invoices?page=1&query=pending would look like this: {page: '1', query: 'pending'}.

- **usePathname** - Lets you read the current URL's pathname. For example, the route /dashboard/invoices, usePathname would return '/dashboard/invoices'.

- **useRouter** - Enables navigation between routes within client components programmatically. There are multiple methods you can use.

Here's a quick overview of the implementation steps:

1. Capture the user's input.
2. Update the URL with the search params.
3. Keep the URL in sync with the input field.
4. Update the table to reflect the search query.

1. Capture the user's input

Go into the \<Search\> Component (/app/ui/search.tsx), and you'll notice:

"use client" - This is a Client Component, which means you can use event listeners and hooks.
\<input\> - This is the search input.
Create a new handleSearch function, and add an onChange listener to the \<input\> element.

onChange will invoke handleSearch whenever the input value changes.

2. Update the URL with the search params

Import the useSearchParams hook from 'next/navigation', and assign it to a variable.

Inside handleSearch, create a new URLSearchParams instance using your new searchParams variable.

URLSearchParams is a Web API that provides utility methods for manipulating the URL query parameters. Instead of creating a complex string literal, you can use it to get the params string like ?page=1&query=a.

Next, set the params string based on the user’s input. If the input is empty, you want to delete it.

Now that you have the query string. You can use Next.js's useRouter and usePathname hooks to update the URL.

Import useRouter and usePathname from 'next/navigation', and use the replace method from userRouter() inside handleSearch.

Here's a breakdown of what's happening:

${pathname} is the current path, in your case, "/dashboard/invoices".
As the user types into the search bar, params.toString() translates this input into a URL-friendly format.
The replace(${pathname}?${params.toString()}); command updates the URL with the user's search data. For example, /dashboard/invoices?query=lee if the user searches for "lee".
The URL is updated without reloading the page, thanks to Next.js's client-side navigation

```tsx
'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const params = new URLSearchParams(searchParams)
    const term: string = e.target.value
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }
  //...
}
```

3. Keeping the URL and input in sync

To ensure the input field is in sync with the URL and will be populated when sharing, you can pass a defaultValue to input by reading from searchParams.

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

> defaultValue vs. value / Controlled vs. Uncontrolled
>
>If you're using state to manage the value of an input, you'd use the value attribute to make it a controlled component. This means React would manage the input's state.
>
>However, since you're not using state, you can use defaultValue. This means the native input will manage its own state. This is okay since you're saving the search query to the URL instead of state.

4. Updating the table

Finally, you need to update the table component to reflect the search query.

Navigate back to the invoices page.

Page components accept a prop called searchParams, so you can pass the current URL params to the \<Table\> component.

If you navigate to the \<Table\> Component, you'll see that the two props, query and currentPage, are passed to the fetchFilteredInvoices() function which returns the invoices that match the query.

> ❓ When to use the useSearchParams() hook vs. the searchParams prop?
>
>You might have noticed you used two different ways to extract search params. Whether you use one or the other depends on whether you're working on the client or the server.
>
>\<Search\> is a Client Component, so you used the useSearchParams() hook to access the params from the client.
>
>\<Table\> is a Server Component that fetches its own data, so you can pass the searchParams prop from the page to the component.
>
>As a general rule, if you want to read the params from the client, use the useSearchParams() hook as this avoids having to go back to the server.


### Best practice: Debouncing

Congratulations! You've implemented search with Next.js! But there's something you can do to optimize it.

You're updating the URL on every keystroke, and therefore querying your database on every keystroke! This isn't a problem as our application is small, but imagine if your application had thousands of users, each sending a new request to your database on each keystroke.

Debouncing is a programming practice that limits the rate at which a function can fire. In our case, you only want to query the database when the user has stopped typing.

How Debouncing Works:

1. Trigger Event: When an event that should be debounced (like a keystroke in the search box) occurs, a timer starts.
2. Wait: If a new event occurs before the timer expires, the timer is reset.
3. Execution: If the timer reaches the end of its countdown, the debounced function is executed.

You can implement debouncing in a few ways, including manually creating your own debounce function. To keep things simple, we'll use a library called use-debounce.

```bash
npm i use-debounce
```

In your \<Search\> Component, import a function called useDebouncedCallback
This function will wrap the contents of handleSearch, and only run the code after a specific time once the user has stopped typing (300ms).

By debouncing, you can reduce the number of requests sent to your database, thus saving resources. 🖥️

## Adding pagination

After introducing the search feature, you'll notice the table displays only 6 invoices at a time. This is because the fetchFilteredInvoices() function in data.ts returns a maximum of 6 invoices per page.

Adding pagination allows users to navigate through the different pages to view all the invoices. Let's see how you can implement pagination using URL params, just like you did with search.

Navigate to the \<Pagination/\> component and you'll notice that it's a Client Component. You don't want to fetch data on the client as this would expose your database secrets (remember, you're not using an API layer). Instead, you can fetch the data on the server, and pass it to the component as a prop.

In /dashboard/invoices/page.tsx, import a new function called fetchInvoicesPages and pass the query from searchParams as an argument.

fetchInvoicesPages returns the total number of pages based on the search query. For example, if there are 12 invoices that match the search query, and each page displays 6 invoices, then the total number of pages would be 2.

Next, pass the totalPages prop to the \<Pagination/\> component.
Import the usePathname and useSearchParams hooks. We will use this to get the current page and set the new page.

Here's a breakdown of what's happening:

- createPageURL creates an instance of the current search parameters.
- Then, it updates the "page" parameter to the provided page number.
- Finally, it constructs the full URL using the pathname and updated search parameters.

Finally, when the user types a new search query, you want to reset the page number to 1. You can do this by updating the handleSearch function in your \<Search\> component.

### Summary

Congratulations! You've just implemented search and pagination using URL Params and Next.js APIs.

To summarize, in this chapter:

- You've handled search and pagination with URL search parameters instead of client state.
- You've fetched data on the server.
- You're using the useRouter router hook for smoother, client-side transitions.

These patterns are different from what you may be used to when working with client-side React, but hopefully, you now better understand the benefits of using URL search params and lifting this state to the server.

---

## Mutating Data

Learn how to mutate data with Server Actions.

In the previous chapter, you implemented search and pagination using URL Search Params and Next.js APIs. Let's continue working on the Invoices page by adding the ability to create, update, and delete invoices!

In this chapter...

Here are the topics we’ll cover

- What React Server Actions are and how to use them to mutate data.

- How to work with forms and Server Components.

- Best practices for working with the native formData object, including type validation.

- How to revalidate the client cache using the revalidatePath API.

- How to create dynamic route segments with specific IDs.

- How to use the React’s useFormStatus hook for optimistic updates.

### What are Server Actions?

React Server Actions allow you to run asynchronous code directly on the server. They eliminate the need to create API endpoints to mutate your data. Instead, you write asynchronous functions that execute on the server and can be invoked from your Client or Server Components.

Security is a top priority for web applications, as they can be vulnerable to various threats. This is where Server Actions come in. They offer an effective security solution, protecting against different types of attacks, securing your data, and ensuring authorized access. Server Actions achieve this through techniques like POST requests, encrypted closures, strict input checks, error message hashing, and host restrictions, all working together to significantly enhance your app's safety.

### Using forms with Server Actions

In React, you can use the action attribute in the \<form\> element to invoke actions. The action will automatically receive the native formData object, containing the captured data.

For example:

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

An advantage of invoking a Server Action within a Server Component is progressive enhancement - forms work even if JavaScript is disabled on the client.

### Next.js with Server Actions

Server Actions are also deeply integrated with Next.js caching. When a form is submitted through a Server Action, not only can you use the action to mutate data, but you can also revalidate the associated cache using APIs like **revalidatePath** and **revalidateTag.**

Let's see how it all works together!

Creating an invoice
Here are the steps you'll take to create a new invoice:

1. Create a form to capture the user's input.
2. Create a Server Action and invoke it from the form.
3. Inside your Server Action, extract the data from the formData object.
4. Validate and prepare the data to be inserted into your database.
5. Insert the data and handle any errors.
6. Revalidate the cache and redirect the user back to invoices page.

1. Create a new route and form

To start, inside the /invoices folder, add a new route segment called /create with a page.tsx file:

```bash
└── invoices
    └── create
        └── page.tsx
```

Your page is a Server Component that fetches customers and passes it to the \<Form\> component.

Navigate to the \<Form\> component, and you'll see that the form:

- Has two \<select\> (dropdown) elements: customers and status.
- Has one \<input\> element for the amount with type="number".
- Has one button with type="submit".

![Form Invoices create](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Fcreate-invoice-page.png&w=1080&q=75&dpl=dpl_FQk1vqJFzbvQf7ciyg5D7QiENdN4)

2. Create a Server Action

Great, now let's create a Server Action that is going to be called when the form is submitted.

Navigate to your lib directory and create a new file named actions.ts. At the top of this file, add the React use server directive.

By adding the 'use server', you mark all the exported functions within the file as server functions. These server functions can then be imported into Client and Server components, making them extremely versatile.

You can also write Server Actions directly inside Server Components by adding "use server" inside the action. But for this course, we'll keep them all organized in a separate file.

In your actions.ts file, create a new async function that accepts formData:

```ts
'use server';
 
export async function createInvoice(formData: FormData) {}
```

Then, in your \<Form\> component, import the createInvoice from your actions.ts file. Add a action attribute to the \<form\> element, and call the createInvoice action.

>Good to know: In HTML, you'd pass a URL to the action attribute. This URL would be the destination where your form data should be submitted (usually an API endpoint).
>
>However, in React, the action attribute is considered a special prop - meaning React builds on top of it to allow actions to be invoked. Rather than calling an API explicitly, you can pass a function to action.
>
>Behind the scenes, Server Actions create a POST API endpoint. This is why you don't need to create API endpoints manually when using Server Actions.

3. Extract the data from formData

Back in your actions.ts file, you'll need to extract the values of formData, there are a couple of methods you can use. For this example, let's use the .get(name) method.

```ts
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

>Tip: If you're working with forms that have many fields, you may want to consider using the entries() method with JavaScript's Object.fromEntries(). For example:
>
>const rawFormData = Object.fromEntries(formData.entries())

To check everything is connected correctly, go ahead and try out the form. After submitting, you should see the data you just entered into the form logged in your terminal.

Now that your data is in the shape of an object, it'll be much easier to work with.

```bash
{
  customerId: 'cc27c14a-0acf-4f4a-a6c9-d45682c144b9',
  amount: '1000',
  status: 'paid'
}
```

4. Validate and prepare the data

Before sending the form data to your database, you want to ensure it's in the correct format and with the correct types. If you remember from earlier in the course, your invoices table expects data in the following format:

```ts
export type Invoice = {
  id: string; // Will be created on the database
  customer_id: string;
  amount: number; // Stored in cents
  status: 'pending' | 'paid';
  date: string;
};
```

So far, you only have the customer_id, amount, and status from the form.

Type validation and coercion
It's important to validate that the data from your form aligns with the expected types in your database. For instance, if you add a console.log inside your action...

You'll notice that amount is of type string and not number. This is because input elements with type="number" actually return a string, not a number!

To handle type validation, you have a few options. While you can manually validate types, using a type validation library can save you time and effort. For your example, we'll use **Zod**, a TypeScript-first validation library that can simplify this task for you.

In your actions.ts file, import Zod and define a schema that matches the shape of your form object. This schema will validate the formData before saving it to a database.

```ts
import { z } from 'zod';
 
const InvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoice = InvoiceSchema.omit({ id: true, date: true });
```

The amount field is specifically set to coerce (change) from a string to a number while also validating its type.

You can then pass your rawFormData to NewInvoice to validate the types:

**Storing values in cents**

It's usually good practice to store monetary values in cents in your database to eliminate JavaScript floating-point errors and ensure greater accuracy.

Let's convert the amount into cents:

`const amountInCents = amount * 100;`

**Creating new dates**

Finally, let's create a new date with the format "YYYY-MM-DD" for the invoice's creation date:

`const date = new Date().toISOString().split('T')[0];`

5. Inserting the data into your database

Now that you have all the values you need for your database, you can create an SQL query to insert the new invoice into your database and pass in the variables:

```ts
import { sql } from '@vercel/postgres';
// ...
await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;
```

Right now, we're not handling any errors. We'll do it in the next chapter. For now, let's move on to the next step.

6. Revalidate and redirect

Next.js has a **Client-side Router Cache** that stores the route segments in the user's browser for a time. Along with prefetching, this cache ensures that users can quickly navigate between routes while reducing the number of requests made to the server.

Since you're updating the data displayed in the invoices route, you want to clear this cache and trigger a new request to the server. You can do this with the **revalidatePath** function from Next.js:

```ts
import { revalidatePath } from 'next/cache';
//...
  revalidatePath('/dashboard/invoices');
```

Once the database has been updated, the /dashboard/invoices path will be revalidated, and fresh data will be fetched from the server.

At this point, you also want to redirect the user back to the /dashboard/invoices page. You can do this with the redirect function from Next.js:

```ts
import { redirect } from 'next/navigation';
// ...
  redirect('/dashboard/invoices');
```

Congratulations! You've just implemented your first Server Action. Test it out by adding a new invoice, if everything is working correctly:

1. You should be redirected to the /dashboard/invoices route on submission.
2. You should see the new invoice at the top of the table.

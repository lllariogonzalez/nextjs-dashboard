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


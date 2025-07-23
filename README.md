This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


## Project Overview

This application is a modern property listing platform built with Next.js. It features:

- **Property Cards:** Displays property information such as images, address, price, and description in a visually appealing card format.
- **Image Carousel:** Hovering over a property card cycles through available property images with a smooth fade effect. 
- **Navigation:** Clicking a property card saves its details to session storage and navigates to a detailed property page.
- **Protected Routes & Authorization:** Certain pages are protected and require user authentication. Authorization logic ensures only permitted users can access sensitive routes.
- **Validation:** User input and data are validated both on the client and server to ensure data integrity and security.
- **Static & SSR Pages:** The app uses both static generation (SSG) and server-side rendering (SSR) for optimal performance and SEO. With the Next.js App Router, data fetching is handled using async server components and route segment configuration (such as `export const revalidate`), rather than the traditional `getStaticProps`/`getServerSideProps` methods. Some pages are pre-rendered at build time, while others fetch data on each request.
- **Responsive Design:** The layout adapts to different screen sizes for optimal viewing on all devices. 
- **Easy Customization:** Components are modular and reusable, making it easy to extend or modify functionality.
- **Picture-in-Picture (PiP) / Open Image:** Clicking the PiP icon on the property detail page will attempt to open the image in Picture-in-Picture mode (if supported), or open the image in a new browser tab.

This project is ideal as a starting point for real estate or property management web applications.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.




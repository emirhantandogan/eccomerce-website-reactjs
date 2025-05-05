## CS391 Project 2
- Emirhan Tandoğan S028745
- This project is a web application built with ReactJS, NextJS, NodeJS, and Bootstrap. It includes a Home page, Product Detail page, Shopping Cart, and Add Campaign page. All data is managed via RESTful services using json-server, with no local storage, and proper HTTP methods are used for all operations.

## Features

- **Home Page** 
    - Page contain: Navigation Bar, Campaign Carousel, Search/Sort/Category Selection Bar, Product List.
    - Page has responsive grid showing 1-5 products per row depending on the screen width.
    - Each product has thumbnail image, name, price, destription and add to cart button.
    - Campaign carousel, navigation bar, filterable product list and each product's card is created as components. 
- **Product Detail Page**
    - Page contain, Carousel for product images,name, price per product, total price, destription, add to cart button, go to cart button, reviews section and add review form.
    - Product details part and add review form part is created as two seperate component and merged into one page.
    - Each review contain username, title, start and review text.
- **Shopping Cart Page**
    - View items added to cart, adjust quantities (with PUT), remove items (DELETE).
    - Real time total calculations.
    - Additional delivery fee.
    - Empty cart button and process checkout button.
    - When proceed checkout button is clicked, order summary view is shown (containing total price, delivery fee and amount to pay).
- **Add Campaign page**  
    - Select a product and discount percent to create new campaigns.
    - Already added campaigns also shown below.  

## Technologies Used

- **Frontend**  
    - Next.js 
    - React
    - Bootstrap 5 for layout & components  
    - Axios for HTTP requests  

- **Backend**  
    - `json-server` serving `db.json` as RESTful API  
    - `npm-run-all` to run frontend and backend in parallel  

## Running the Project Summary
- npm install
- npm run dev

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

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

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.


### Project Overview

This is a Next.js project with an Express backend. The frontend is bootstrapped with `create-next-app` and the backend is located in the `/backend` directory.

### Getting Started

#### Prerequisites

  * Node.js (LTS version recommended)
  * npm, yarn, pnpm, or bun

#### Environment Variables

Create a `.env` file in the root directory for the Next.js frontend with the following variable:

`NEXT_PUBLIC_API_URL=http://localhost:4000`

Create a `.env` file in the `backend` directory for the Express backend with the following variables:

```bash
PORT=4000
MONGO_URI=mongodb+srv://muraliraj386:tJQItPshgROqPKEB@cluster0.bkgn6wk.mongodb.net/
JWT_ACCESS_SECRET=replace_with_a_strong_random_secret_for_access
JWT_REFRESH_SECRET=replace_with_a_different_strong_secret_for_refresh
CLIENT_URL=http://localhost:3000
```

#### Installation and Running the Project

1.  **Install dependencies for the frontend:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

2.  **Install dependencies for the backend:**

    ```bash
    cd backend
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    cd ..
    ```

3.  **Run the development servers:**

      * **Start the backend server (in a separate terminal):**

        ```bash
        cd backend
        npm run dev
        # or
        yarn dev
        # or
        pnpm dev
        # or
        bun dev
        ```

      * **Start the frontend development server:**

        ```bash
        npm run dev
        # or
        yarn dev
        # or
        pnpm dev
        # or
        bun dev
        ```

4.  Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to see the Next.js frontend. The page automatically updates as you edit `app/page.tsx`.

### API Documentation

The API documentation can be found here: [https://docs.google.com/document/d/1lLcAhh6jGY9TLGDJmOIThidR8CY4ALXEBaD1cBlP7xE/edit?usp=sharing](https://docs.google.com/document/d/1lLcAhh6jGY9TLGDJmOIThidR8CY4ALXEBaD1cBlP7xE/edit?usp=sharing)

### Learn More

  * **Next.js Documentation:** Learn about Next.js features and API.
  * **Learn Next.js:** An interactive Next.js tutorial.
  * **Next.js GitHub repository:** Your feedback and contributions are welcome\!

### Deployment

The easiest way to deploy the Next.js app is to use the Vercel Platform. For more details on deployment, check the Next.js deployment documentation.
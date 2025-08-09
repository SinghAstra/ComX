# ComX - Connecting Communities Through Shared Thoughts

## Project Overview

ComX exists to solve the problem of **fragmented online discussions**. In a world saturated with social media platforms, it's hard to find a space for thoughtful, focused conversations. ComX provides a platform where users can share their thoughts, engage in meaningful discussions, and connect with others who share their interests.

**Target Audience:**

*   Individuals seeking a platform for sharing ideas and engaging in discussions.
*   Communities looking for a dedicated space to connect and collaborate.
*   Developers who want to contribute to an open-source project focused on building a better online communication experience.

**What Makes ComX Unique:**

*   **Focus on thoughtful content:** ComX prioritizes quality over quantity, encouraging users to share well-crafted posts and engage in respectful discussions.
*   **Clean and intuitive interface:** The platform is designed to be easy to use and navigate, allowing users to focus on the content.
*   **Open-source and community-driven:** ComX is built by and for the community, with a focus on transparency and collaboration.

## Key Features

*   **User Authentication:**
    *   Secure user signup and login with password hashing using `bcryptjs`.
    *   Email verification to ensure account authenticity.
    *   JWT (JSON Web Token) based authentication for secure session management.
    *   Password comparison for login authentication.
*   **Profile Management:**
    *   Users can update their profile information, including name and bio.
    *   Input validation to ensure data integrity.
*   **Post Creation and Display:**
    *   Users can create new posts with content validation.
    *   Posts are displayed in a feed with author information and formatted date.
    *   Real-time data fetching and revalidation using SWR.
*   **User-Specific Post Feed:**
    *   Display posts created by a specific user.
*   **UI Components:**
    *   Reusable UI components built with `shadcn/ui` for a consistent and modern look and feel.
    *   Includes components like buttons, cards, inputs, labels, and more.
*   **Animations:**
    *   Framer Motion is used to create smooth and engaging animations.
    *   Reusable animation variants for blur-in, scale-in, fade-in, and slide-up effects.
*   **Email Notifications:**
    *   Sends emails using Nodemailer with Gmail for account verification and other notifications.

## Architecture & Code Organization

ComX follows a **component-based architecture** built on Next.js, leveraging server actions for backend logic and client components for the user interface.

**Key Components and Interactions:**

*   **`app` directory:** Contains the Next.js application routes and pages.
    *   `(auth)` route group: Handles authentication-related pages (login, register, verify-email).
    *   `(home)` route group: Handles the main application pages (home feed, post creation).
    *   `profile/[userId]` route: Displays user profiles.
    *   `settings/profile` route: Allows users to edit their profile.
*   **`components` directory:** Contains reusable UI components.
    *   `ui` directory: Contains basic UI elements from `shadcn/ui`.
    *   `home` directory: Contains components specific to the home page, such as the post feed and create post form.
    *   `component-x` directory: Contains experimental or unique components like moving backgrounds and border effects.
*   **`actions` directory:** Contains server actions for handling form submissions and data mutations.
    *   `auth.ts`: Handles user authentication actions.
    *   `posts.ts`: Handles post creation actions.
*   **`lib` directory:** Contains utility functions and shared logic.
    *   `auth.ts`: Implements authentication logic (password hashing, token generation).
    *   `db.ts`: Initializes the Prisma client for database interactions.
    *   `utils.ts`: Contains utility functions like class name merging.
*   **`prisma` directory:** Contains the Prisma schema and migrations for managing the database.
*   **`interfaces` directory:** Defines TypeScript interfaces for data structures.
*   **`validations` directory:** Defines Yup schemas for validating user input and post content.

**Directory Structure Mapping:**

*   `app/`: Page routing and layout
*   `components/`: Reusable UI elements
*   `actions/`: Server-side data mutations
*   `lib/`: Shared utilities and logic
*   `prisma/`: Database schema and migrations
*   `interfaces/`: TypeScript type definitions
*   `validations/`: Data validation schemas

**Key Design Decisions:**

*   **Server Actions:** Using server actions for data mutations provides a secure and efficient way to interact with the database.
*   **SWR:** Utilizing SWR for data fetching simplifies data management and provides a great user experience with automatic revalidation.
*   **Prisma:** Choosing Prisma as the ORM provides a type-safe and efficient way to interact with the PostgreSQL database.
*   **shadcn/ui:** Using `shadcn/ui` provides a set of pre-built, customizable UI components that accelerate development and ensure a consistent look and feel.

## Technology Stack

*   **Next.js:** A React framework for building server-rendered and statically generated web applications. Chosen for its performance, SEO optimization, and developer experience.
*   **TypeScript:** A superset of JavaScript that adds static typing. Chosen for its improved code maintainability and reduced runtime errors.
*   **Tailwind CSS:** A utility-first CSS framework. Chosen for its flexibility and ease of use in styling components.
*   **Prisma:** A modern database toolkit and ORM. Chosen for its type safety and ease of use in interacting with the database.
*   **PostgreSQL:** A robust and reliable open-source relational database.
*   **SWR:** A React Hooks library for remote data fetching. Chosen for its simplicity and built-in caching and revalidation.
*   **Yup:** A JavaScript schema builder for value parsing and validation.
*   **Framer Motion:** A production-ready motion library for React. In ComX, it's used for creating smooth and engaging animations.
*   **Nodemailer:** A module for Node.js applications to allow easy email sending.

**Key Dependencies:**

*   `@prisma/client`: Prisma client for database interactions.
*   `bcryptjs`: For password hashing.
*   `jsonwebtoken`: For generating and verifying JWT tokens.
*   `nodemailer`: For sending emails.
*   `clsx` and `tailwind-merge`: For conditionally applying class names.
*   `swr`: For data fetching and caching.
*   `yup`: For data validation.
*   `framer-motion`: For animations.
*   `shadcn/ui`: For UI components.

## Getting Started

1.  **Prerequisites:**
    *   Node.js (version 18 or higher)
    *   npm or yarn
    *   PostgreSQL database

2.  **Installation:**

    ```bash
    git clone <repository-url>
    cd ComX
    npm install # or yarn install
    ```

3.  **Configuration:**

    *   Create a `.env` file in the root directory and configure the following environment variables:

        ```
        DATABASE_URL="postgresql://user:password@host:port/database?schema=public"
        NEXTAUTH_SECRET="your-secret-key"
        ACCESS_TOKEN_COOKIE_NAME="accessToken"
        REFRESH_TOKEN_COOKIE_NAME="refreshToken"
        EMAIL_FROM="your-email@gmail.com"
        EMAIL_PASS="your-email-password"
        ```

    *   Update the `DATABASE_URL` with your PostgreSQL database connection string.
    *   Generate a secure random string for `NEXTAUTH_SECRET`.
    *   Configure your Gmail credentials for sending emails.

4.  **Database Setup:**

    ```bash
    npx prisma migrate dev
    ```

    This command will create the database tables based on the Prisma schema.

5.  **Running the Development Server:**

    ```bash
    npm run dev # or yarn dev
    ```

    This will start the Next.js development server at `http://localhost:3000`.

6.  **Basic Usage:**

    *   Open your browser and navigate to `http://localhost:3000`.
    *   Create an account and log in.
    *   Start sharing your thoughts and connecting with others!

**Common Development Commands:**

*   `npm run dev`: Start the development server.
*   `npm run build`: Build the application for production.
*   `npm run start`: Start the production server.
*   `npx prisma migrate dev`: Apply database migrations.
*   `npx prisma studio`: Open the Prisma Studio to view and manage the database.
*   `npm run lint`: Run the linter.
*   `npm run format`: Format the code.

## Project Structure

```
ComX/
├── app/                      # Next.js application routes and pages
│   ├── (auth)/               # Authentication pages (login, register, verify-email)
│   ├── (home)/               # Main application pages (home feed, post creation)
│   ├── profile/[userId]/     # User profile page
│   ├── settings/profile/    # User profile settings page
│   └── layout.tsx            # Root layout
├── components/               # Reusable UI components
│   ├── ui/                   # Basic UI elements from shadcn/ui
│   ├── home/                 # Home page components
│   ├── component-x/          # Experimental components
│   └── ...
├── actions/                  # Server actions
│   ├── auth.ts               # Authentication actions
│   └── posts.ts              # Post creation actions
├── lib/                      # Utility functions and shared logic
│   ├── auth.ts               # Authentication logic
│   ├── db.ts                 # Prisma client initialization
│   ├── utils.ts              # Utility functions
│   └── ...
├── prisma/                   # Database schema and migrations
│   ├── schema.prisma         # Prisma schema
│   └── migrations/           # Database migrations
├── interfaces/               # TypeScript type definitions
│   ├── auth.ts
│   ├── post.ts
│   └── site.ts
├── validations/              # Data validation schemas
│   ├── auth.ts
│   ├── post.ts
│   └── user.ts
├── config/                   # Configuration files
│   └── site.ts               # Site configuration
├── public/                   # Static assets
├── styles/                   # Global styles
├── .env                      # Environment variables
├── package.json              # Project metadata and dependencies
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

**Important Files:**

*   `app/layout.tsx`: The root layout of the application.
*   `prisma/schema.prisma`: The Prisma schema that defines the database structure.
*   `lib/db.ts`: The Prisma client initialization file.
*   `actions/auth.ts` and `actions/posts.ts`: Server actions for handling data mutations.
*   `components/`: All the reusable UI components.

We hope this README provides a clear understanding of the ComX project. We welcome contributions and look forward to building a better online communication experience together!
# Supabase Next.js Demo App

A demo application showcasing various features of Supabase with Next.js.

## Features

-   **Framework:** [Next.js](https://nextjs.org/) (App Router)
-   **Backend:** [Supabase](https://supabase.com/)
-   **Authentication:** Full password-based auth (Sign Up, Sign In, etc.)
-   **UI:** [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/)
-   **Realtime:** Demos for Broadcast and Postgres Changes
-   **Storage:** File upload demo using Supabase Storage

## Getting Started

### 1. Set up your environment

You'll need a Supabase project. You can create one for free at [supabase.com](https://supabase.com).

This project requires environment variables to run. Your `.env.local` should look like this:

```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

### 2. Install dependencies and run the app

```bash
npm install
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Demos Included

-   **/chat:** A realtime chat application.
-   **/todo-broadcast:** A todo list that uses Supabase Broadcast to send realtime messages between clients.
-   **/todo-postgres-changes:** A todo list that updates in realtime based on database changes using Supabase Postgres Changes.
-   **/upload:** A page to demonstrate file uploads to Supabase Storage.
-   **/protected:** A sample page that is only accessible to authenticated users.

# CIVIX - Electronic Voting Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

CIVIX is a professional and responsive electoral interface built with Next.js 15, featuring the App Router and strict TypeScript. It is designed to integrate seamlessly with an existing Spring Boot API, reusing all data models and services from the backend.

## 🚀 Key Features

### Public Pages
*   **Homepage (`/`)**: An attractive and informative presentation of the platform with calls to action.
*   **Elections (`/elections`)**: A comprehensive list of all elections, with filtering by status (open, closed, etc.) and full-text search.
*   **Candidates (`/candidats`)**: Detailed candidate profiles with photos, information, and links to their campaigns.
*   **Campaigns (`/campagnes`)**: Descriptions of electoral campaigns with associated candidates and details.

### Protected Pages (Requires Login)
*   **Vote (`/vote`)**: A secure voting interface for casting ballots, including a preview and confirmation step.
*   **Results (`/resultats`)**: Real-time election results, statistics, participation rates, and historical data.
*   **Profile (`/profil`)**: User profile management, including personal information, voting history, and password changes.

## 🛠️ Tech Stack

### Frameworks & Languages
*   **Next.js 15**: React framework with App Router.
*   **React 19**: UI library.
*   **TypeScript 5**: Strict static typing.

### UI & Styling
*   **Tailwind CSS 4**: Utility-first CSS framework.
*   **Framer Motion**: Fluid animations and transitions.
*   **Lucide React**: Icon library.

### State Management & Data Fetching
*   **TanStack Query (React Query)**: Asynchronous state management and API data synchronization.
*   **Axios**: Promise-based HTTP client for API requests.

### Forms & Validation
*   **React Hook Form**: Performant and flexible form management.
*   **Zod**: Schema declaration and validation.

### Authentication & Security
*   **Jose**: JWT (JSON Web Token) handling for secure sessions.
*   **Next.js Middleware**: Server-side route protection and request handling.

## 📦 Getting Started

Follow these instructions to set up the project for local development.

### Prerequisites
*   Node.js v18 or later
*   `npm` or `yarn`
*   A running instance of the CIVIX Spring Boot API.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/PIO-VIA/Civix-fornt_end.git 
    cd Civix-fornt_end
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Environment Variables

Create a `.env.local` file in the root of the project and add the following variables. The `JWT_SECRET` must be a secure, private key and should match the one used by the backend API.

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

### Running the Application

To start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

## 📜 Available Scripts

The following scripts are available in `package.json`:

*   `npm run dev`: Starts the development server.
*   `npm run build`: Creates a production-ready build of the application.
*   `npm run start`: Starts the production server (requires `npm run build` first).
*   `npm run lint`: Lints the codebase using Next.js's built-in ESLint configuration.

## 🏗️ Project Structure

The codebase is organized to separate concerns and leverage Next.js App Router conventions.

```
src/
├── app/              # App Router: Pages, Layouts, and API Routes
├── components/       # Reusable React components (UI, Layout, Forms)
├── hooks/            # Custom React hooks for shared logic
├── lib/              # Core application logic, API services, and auth
│   ├── api/          # API client configuration (Axios)
│   ├── auth/         # Authentication utilities and services
│   ├── models/       # TypeScript DTOs (Data Transfer Objects)
│   └── services/     # Reused API service classes
├── types/            # Global TypeScript types
└── middleware.ts     # Next.js middleware for route protection
```

## 🔒 Authentication

Authentication is handled using JWTs stored in secure, httpOnly cookies.

*   **Login**: The `/login` page sends credentials to the backend, which returns a JWT.
*   **Middleware**: The `middleware.ts` file intercepts requests to protected routes (`/vote`, `/profil`, `/resultats`). It validates the JWT on the server-side before allowing access.
*   **API Requests**: The API client (Axios) is configured to automatically include the JWT in the authorization header for all authenticated requests.
*   **Public Routes**: `/`, `/elections`, `/candidats`, `/campagnes`, and `/login`.
*   **Protected Routes**: `/vote`, `/resultats`, `/profil`.

## 🤝 Contributing

Contributions are welcome. To contribute to the project, please adhere to the following guidelines:
1.  Respect the existing architecture.
2.  Reuse existing services and data models wherever possible.
3.  Follow the established naming conventions.
4.  Maintain consistency with the existing design system.
5.  Ensure new features are tested and linted.

## 📞 Support

For any questions or technical support, please contact me .

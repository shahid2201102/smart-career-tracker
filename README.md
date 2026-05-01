# Smart Career Tracker & AI Resume Optimizer

Smart Career Tracker is a full-stack career management platform designed for students and job seekers. It combines job application tracking, AI resume analysis, and insights into career success probability in a secure, scalable Next.js app.

## Project Overview

This product helps users manage job applications, upload and analyze resumes, and match application materials to job descriptions using AI. It provides a modern dashboard experience, role-based access, and secure authentication.

## Features

- Secure JWT-based authentication
- Role-based user model (user/admin)
- Job application tracker with status, salary, deadline, filtering and search
- Resume PDF upload plus metadata storage and text parsing
- AI resume scoring and suggestion engine via OpenAI
- Job description matching to improve application fit
- Dashboard metrics and analytics
- Responsive UI with dark mode support
- Input validation with Zod
- Security headers and rate limiting
- Type-safe Prisma MySQL data layer

## Tech Stack

- Next.js 16 (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- Prisma ORM with MySQL
- JWT authentication
- OpenAI API integration
- Jest + Playwright testing
- GitHub Actions-ready workflow

## Architecture

Textual architecture diagram:

- `app/`
  - Page routes for landing, auth, dashboard, applications, resumes
  - API routes for auth, applications, resumes, AI, and metrics
- `components/`
  - Reusable UI primitives and client-side panels
- `lib/`
  - Database, JWT, session, validation, OpenAI, rate limiting
- `services/`
  - Business logic for auth, jobs, resumes, analytics
- `prisma/`
  - Database schema and migration model

## Setup Instructions

1. Clone the repository.
2. Copy `.env.example` to `.env`.
3. Install dependencies:

```bash
npm install
```

4. Configure MySQL database credentials in `.env`.
5. Generate Prisma client and migrate database:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

6. Start the development server:

```bash
npm run dev
```

7. Open `http://localhost:3000`.

## Environment Variables

- `DATABASE_URL` - MySQL connection string
- `NEXTAUTH_SECRET` - JWT secret for authentication
- `NEXTAUTH_URL` - App URL for auth cookie domain
- `OPENAI_API_KEY` - OpenAI API key for AI features
- `RATE_LIMIT_WINDOW` - Rate limiter window in seconds
- `RATE_LIMIT_MAX` - Max requests per rate window

## API Documentation

### Auth

- `POST /api/auth/register` - Register a new user and set auth cookie
- `POST /api/auth/login` - Login and issue auth cookie
- `POST /api/auth/logout` - Clear auth cookie
- `GET /api/auth/me` - Retrieve current authenticated user

### Applications

- `GET /api/applications` - List user applications with optional `query`, `status`, `page`
- `POST /api/applications` - Create a new application
- `PATCH /api/applications` - Update application details
- `DELETE /api/applications` - Delete application by ID

### Resumes

- `GET /api/resumes` - Retrieve user resumes
- `POST /api/resumes` - Save resume metadata and analysis
- `POST /api/resumes/upload` - Upload PDF resume and parse text

### AI

- `POST /api/ai` - Compare resume to job description and return match score

### Metrics

- `GET /api/metrics` - Retrieve dashboard analytics

## Deployment Guide

- Deploy to Vercel using the Next.js project.
- Connect environment variables through Vercel dashboard.
- Use a managed MySQL provider such as PlanetScale or Railway.
- Ensure `NEXTAUTH_SECRET` and `OPENAI_API_KEY` are configured.

## Screenshots

> Placeholder: Landing page screenshot

> Placeholder: Dashboard analytics screenshot

> Placeholder: Resume upload and AI analysis screenshot

## Future Improvements

- Add notifications and email alerts for deadlines and interview updates
- Implement role-based admin analytics panel
- Add a mobile-first UX with drag-and-drop resume upload
- Provide detailed interview preparation modules and task reminders
- Integrate with job boards for automatic job scraping and syncing

---

Built by SHAHID

GitHub: https://github.com/shahid2201102

LinkedIn: https://www.linkedin.com/in/mohd-shahid-548191328/

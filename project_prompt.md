# CL0V Project Context

## Project Overview
**CL0V** is a Club and Student Activity Management System built for a university environment. It manages students, clubs, events, activities, resource reservations, and guests.

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, `shadcn/ui` (Radix UI primitives), `lucide-react` icons.
- **Database:** SQLite (local `data/cl0v.db` file).
- **ORM/Driver:** `better-sqlite3` (Raw SQL queries are used via `lib/db.ts`).
- **Forms:** `react-hook-form` + `zod` validation.
- **Charts:** `recharts`.
- **Package Manager:** `pnpm` (implied by `pnpm-lock.yaml`).

## Project Structure
- **`/app`**: Next.js App Router pages and layouts.
  - `globals.css`: Tailwind imports and global styles.
  - `layout.tsx`: Root layout with `SidebarProvider` and `AppSidebar`.
  - Directories (`clubs`, `students`, etc.): Feature-specific routes.
- **`/actions`**: Server Actions for data mutations (CRUD operations).
  - Naming convention: `[entity]-actions.ts` (e.g., `club-actions.ts`).
  - Pattern: Validate input -> Execute SQL via `db.prepare` -> `revalidatePath`.
- **`/components`**:
  - `/ui`: Reusable UI components (shadcn/ui).
  - `app-sidebar.tsx`: Main navigation sidebar.
- **`/data`**:
  - `cl0v.db`: SQLite database file.
  - `schema.sql`: Database schema definition.
- **`/lib`**:
  - `db.ts`: Database connection singleton using `better-sqlite3`.
- **`/types`**: TypeScript interfaces (especially `db.ts` for entity types).

## Database Schema & Logic
The database is relational (SQLite) with `PRAGMA foreign_keys = ON`.
**Key Entities:**
1.  **Clubs**: Defined by name and category (art, sport, tech, social).
2.  **Students**: Identified by CNE and email, linked to a **Major**.
3.  **Events**: Large gatherings with start/end dates.
4.  **Activities**: Specific items (Workshop, Conference, etc.) that belong to **EITHER** a `Club` **OR** an `Event` (Enforced by `checkOwner` constraint).
5.  **Resources**: Facilities (Labs, Halls) that can be reserved.
6.  **Reservations**: Link an `Activity` to a `Resource` for a time slot.
7.  **Memberships**: Students joining Clubs.
8.  **Registrations**: Students signing up for specific Activities.

## Development Guidelines
1.  **Database Access:** Use raw SQL queries via `db.prepare(...).run()` or `.all()`. Always use parameterized queries (`@param` or `?`) to prevent injection.
2.  **Server Actions:** Place all mutations in `actions/` folder. Use `'use server'` at the top. Handle errors gracefully and return objects like `{ success: boolean, message: string }`.
3.  **UI Components:** Use existing shadcn components from `components/ui`. Mimic the existing style (clean, minimal, accessible).
4.  **Layout:** The app uses a Sidebar layout. New pages should be content-focused and fit within the `SidebarInset`.
5.  **Tailwind v4:** Use the new v4 syntax (CSS variables for theme values are in `globals.css`).

## Common Tasks
- **Adding a new entity:**
    1.  Update `data/schema.sql` (and run migration if needed).
    2.  Create `types/[entity].ts` (or update `types/db.ts`).
    3.  Create `actions/[entity]-actions.ts` for CRUD.
    4.  Create `app/[entity]/page.tsx` for the list view.
    5.  Add navigation link in `components/app-sidebar.tsx`.

This context should allow you to effectively maintain and extend the CL0V project.

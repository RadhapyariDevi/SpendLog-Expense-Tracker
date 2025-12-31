## SpendLog: Full-Stack Expense & Budget Tracker
SpendLog is a full-stack financial tracking application built with a modern serverless architecture. It provides users with a comprehensive dashboard to manage personal budgets, track granular expenses, and visualize financial health through real-time data aggregation.
### Features
- Dashboard: Shows total budget, total spending, and active budgets in one clear view.
- Smart Budgeting: Create budgets with emoji icons and track spend vs remaining using live progress bars.
- Expense Tracking: Log categorized expenses linked to budgets with date.
- Flexible Filters: View expenses by year, month, or quick views like “This Week”.
- Currency Support: Choose a preferred currency that stays consistent across the app.
- User Authentication: Secure login with Clerk, protected routes, and user-specific data.

### Tech Stack
- **Frontend:** Next.js 15 (App Router), React, Tailwind CSS.
- **Backend/Database:** Drizzle ORM with PostgreSQL/Neon.
- **Authentication:** Clerk Auth.
- **UI Components:** Shadcn UI & Lucide Icons.
- **Charts:** Recharts.
- **Deployment:** Vercel

### Database Schema
The system utilizes a relational model to ensure data integrity:
Budgets Table: Stores budget name, amount, icon, and the owner's email.
Expenses Table: Stores expense name, amount, and a foreign key (budgetId) linking it to the primary budget table.
### Live Website:
[https://spend-log-expense-tracker.vercel.app/](https://spend-log-expense-tracker.vercel.app/)

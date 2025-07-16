# Offpista Superbase Challenge

A Next.js + Supabase starter kit for creating and managing tasks, with authentication and insights.

---

## 🚀 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone [https://github.com/your-username/offpistachallenge.git](https://github.com/joekings2k/offpistaChallenge/)
   cd offpistachallenge
2. **Install dependencies**
   ```bash
   npm install
    # or
   yarn install
3. **Configure environment variables**
   
   *Copy .env.example to .env.local and fill in your Supabase credentials:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
#  Supabase Schema Description
   ## 🗂️ Tasks Table

| Column       | Type        | Description                       |
|--------------|-------------|-----------------------------------|
| `id`         | `uuid`      | Primary key                      |
| `user_id`    | `uuid`      | References `auth.users`          |
| `title`      | `text`      | Task title                       |
| `description`| `text`      | Task description                 |
| `status`     | `text`      | One of: `pending`, `in-progress`, `done` |
| `inserted_at`| `timestamptz`| Creation timestamp               |

## 🔐 Auth

Uses **Supabase Auth** for user sign-up, login, and session management.

## 📝 Dev Note

**What I'd build next if I had more time:**
 
- 💬 **Task comments** – Allow users to comment on tasks for better collaboration.  
- 🔔 **Notifications** – Email or in-app notifications for task updates.  
- 📊 **Better insights** – More detailed analytics and charts for user productivity.  
- 📱 **Mobile responsiveness** – Further polish for mobile and tablet layouts.  
- 🛡️ **Role-based access** – Admin and user roles for better permission management.
- 📝 **Drag and Drop component for ordering tasks
---
   
 
  

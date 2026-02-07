# Supabase Setup Guide for Nunu Spa

This guide will help you set up the Supabase backend for your Nunu Spa website.

## Step 1: Create a Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub or email
4. Create a new project:
   - Project name: `nunu-spa`
   - Database password: Choose a strong password
   - Region: Choose closest to your location (Africa regions recommended)
   - Wait for the project to finish setting up (2-3 minutes)

## Step 2: Create Database Tables

Once your project is ready, click on "SQL Editor" in the left sidebar and run the следующие SQL commands:

### Create Bookings Table

```sql
create table bookings (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  phone_number text not null,
  service_type text not null,
  preferred_date date not null,
  preferred_time time not null,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'completed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table bookings enable row level security;

-- Create policy to allow public inserts (for booking form)
create policy "Allow public to insert bookings"
  on bookings for insert
  with check (true);

-- Create policy to allow authenticated users to view all bookings
create policy "Allow authenticated users to view bookings"
  on bookings for select
  using (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update bookings
create policy "Allow authenticated users to update bookings"
  on bookings for update
  using (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to delete bookings
create policy "Allow authenticated users to delete bookings"
  on bookings for delete
  using (auth.role() = 'authenticated');
```

### Create Messages Table

```sql
create table messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  message text not null,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table messages enable row level security;

-- Create policy to allow public inserts
create policy "Allow public to insert messages"
  on messages for insert
  with check (true);

-- Create policy to allow authenticated users to view all messages
create policy "Allow authenticated users to view messages"
  on messages for select
  using (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update messages
create policy "Allow authenticated users to update messages"
  on messages for update
  using (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to delete messages
create policy "Allow authenticated users to delete messages"
  on messages for delete
  using (auth.role() = 'authenticated');
```

### Create Settings Table

```sql
create table settings (
  id uuid default gen_random_uuid() primary key,
  phone_number text not null,
  maps_embed_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table settings enable row level security;

-- Create policy to allow public to read settings
create policy "Allow public to read settings"
  on settings for select
  using (true);

-- Create policy to allow authenticated users to update settings
create policy "Allow authenticated users to update settings"
  on settings for all
  using (auth.role() = 'authenticated');

-- Insert default settings
insert into settings (phone_number, maps_embed_url) values
('+250 787 891 778', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.5198629928!2d30.0622!3d-1.9536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwNTcnMTMuMCJTIDMwwrAwMycxOS45IkU!5e0!3m2!1sen!2srw!4v1234567890');
```

## Step 3: Create Admin User

1. In the Supabase dashboard, go to "Authentication" → "Users"
2. Click "Add user" → "Create new user"
3. Enter:
   - Email: `admin@nunuspa.com` (or your preferred admin email)
   - Password: Choose a strong password
   - Auto Confirm User: ✅ (check this)
4. Click "Create user"

## Step 4: Get Your API Keys

1. In the Supabase dashboard, go to "Project Settings" (gear icon) → "API"
2. Copy the following values:
   - **Project URL**: Under "Project URL"
   - **anon public key**: Under "Project API keys" → "anon" "public"
   - **service_role key**: Under "Project API keys" → "service_role" (keep this secret!)

## Step 5: Update Environment Variables

1. In your project folder (`c:\Users\IT LAB7 TUMBA\Desktop\nunuspa`), create a file named `.env.local`
2. Add the following content (replace with your actual values):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
NEXT_PUBLIC_WHATSAPP_NUMBER=250787891778
```

## Step 6: Enable Realtime (Optional but Recommended)

1. Go to "Database" → "Replication"
2. Enable replication for:
   - `bookings` table
   - `messages` table
3. This allows the admin dashboard to update in real-time when new bookings come in

## Verification

Once you've completed all steps:
1. Your database tables should be created
2. You should have an admin user
3. Your `.env.local` file should contain all the API keys
4. You're ready to test the application!

## Next Steps

Run the development server:
```bash
npm run dev
```

Then:
- Visit `http://localhost:3000` to see the public website
- Visit `http://localhost:3000/admin/login` to access the admin dashboard
- Log in with your admin credentials

## Troubleshooting

**Q: I can't log in to the admin panel**
- Make sure you created an admin user in Supabase
- Check that you auto-confirmed the user
- Verify your `.env.local` file has the correct API keys

**Q: Bookings aren't saving**
- Check browser console for errors
- Verify the `bookings` table exists in Supabase
- Make sure RLS policies are set up correctly

**Q: Real-time updates aren't working**
- Enable replication for tables in Supabase
- Check browser console for WebSocket connection errors

# Creating Your Admin User in Supabase

Once you've run the database schema SQL, you need to create an admin user to access the dashboard.

## Method 1: Using Supabase Dashboard (Recommended)

1. **Go to Authentication**
   - In your Supabase Dashboard, click **Authentication** in the left sidebar
   - Click **Users**

2. **Add New User**
   - Click the **"Add user"** button (top right)
   - Select **"Create new user"**

3. **Enter Credentials**
   ```
   Email: admin@nunuspa.com
   Password: [choose a strong password]
   ```
   
   > **Important**: Check the box **"Auto Confirm User"** ✅
   > This ensures you can log in immediately without email confirmation

4. **Create User**
   - Click **"Create user"**
   - You should see your new admin user in the list

## Method 2: Using SQL (Alternative)

If you prefer, you can also create the user via SQL:

```sql
-- Create admin user
-- Replace 'your-secure-password' with your actual password
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@nunuspa.com',
  crypt('your-secure-password', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);
```

## Login to Admin Dashboard

Once your admin user is created:

1. **Start your dev server** (if not already running):
   ```bash
   npm run dev
   ```

2. **Navigate to admin login**:
   ```
   http://localhost:3001/admin/login
   ```

3. **Login with your credentials**:
   - Email: `admin@nunuspa.com`
   - Password: [the password you set]

4. **You're in!** 🎉
   You should now see the admin dashboard with:
   - Dashboard overview
   - Bookings management
   - Messages list
   - Settings page

## Accessing Admin from Public Site

There are **3 ways** to access the admin dashboard from your website:

### 1. **Via Navbar** (Desktop)
- Look for the **settings gear icon** (⚙️) in the top-right navbar
- Click it to go to `/admin/login`

### 2. **Via Mobile Menu**
- Tap the hamburger menu (☰) on mobile
- Scroll down to find **"Admin Dashboard"**
- Tap to go to login

### 3. **Direct URL**
- Simply navigate to: `https://your-website.com/admin/login`
- Or locally: `http://localhost:3001/admin/login`

## Troubleshooting

**Q: I can't log in / "Invalid credentials" error**
- Make sure you checked "Auto Confirm User" when creating the user
- Double-check your email and password (they're case-sensitive)
- Try resetting the password in Supabase Dashboard → Authentication → Users

**Q: I forgot my admin password**
- Go to Supabase Dashboard → Authentication → Users
- Find your admin user
- Click the three dots (...) → "Reset Password"
- Set a new password

**Q: Where's the admin link on the website?**
- **Desktop**: Top-right corner of the navbar - small settings gear icon (⚙️)
- **Mobile**: In the hamburger menu - scroll to bottom
- **Or**: Just go directly to `/admin/login`

## Security Note

🔒 **Important**: The admin dashboard is protected by Supabase authentication. Only users created in your Supabase project can log in. Keep your admin credentials secure!

---

**Next Steps**: After logging in, try creating a test booking on the public site and watch it appear in real-time on the admin dashboard! 🚀

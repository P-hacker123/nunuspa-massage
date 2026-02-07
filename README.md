# Nunu Spa Massage Website

A modern, luxury spa website built with Next.js 15, Tailwind CSS, and Supabase.

## Features

### Public Website
- ✨ **Elegant Landing Page** with smooth animations
- 💆‍♀️ **Services Showcase** with 10 massage treatments and pricing
- 📅 **Online Booking System** with real-time database integration
- 💬 **WhatsApp Integration** for instant communication
- 🗺️ **Google Maps** integration for location
- 📱 **Fully Responsive** mobile-first design

### Admin Dashboard
- 🔐 **Secure Authentication** with Supabase
- 📊 **Dashboard Overview** with booking statistics
- 📋 **Bookings Management** with status updates (pending → confirmed → completed)
- ✉️ **Messages Management** to view customer inquiries
- ⚙️ **Settings** to update contact info and maps
- 🔄 **Real-time Updates** using Supabase subscriptions

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Database & Auth**: Supabase
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

Follow the detailed instructions in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) to:
- Create a Supabase project
- Set up database tables
- Create an admin user
- Get API keys

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_WHATSAPP_NUMBER=250787891778
```

### 4. Run Development Server

```bash
npm run dev
```

Visit:
- **Public Site**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin/login

## Project Structure

```
nunuspa/
├── app/
│   ├── admin/           # Admin dashboard pages
│   │   ├── bookings/
│   │   ├── dashboard/
│   │   ├── login/
│   │   ├── messages/
│   │   └── settings/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Landing page
│   └── globals.css      # Global styles
├── components/
│   ├── admin/           # Admin components
│   │   └── Sidebar.tsx
│   ├── HeroSection.tsx
│   ├── ServicesSection.tsx
│   ├── BookingSection.tsx
│   ├── WhyChooseUs.tsx
│   ├── LocationContact.tsx
│   └── WhatsAppButton.tsx
├── lib/
│   ├── supabase.ts      # Supabase client & helpers
│   └── constants.ts     # Services, contact info
└── types/
    └── index.ts         # TypeScript types
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

Vercel will automatically detect Next.js and configure everything.

## Services & Pricing

- Deep Tissue Massage - 40,000 FRW
- Swedish Massage - 35,000 FRW
- Sports Massage - 50,000 FRW
- Aroma Therapy - 40,000 FRW
- Hot Stone Massage - 50,000 FRW
- Lomi Lomi Massage - 40,000 FRW
- Head Massage - 15,000 FRW
- Back Massage - 20,000 FRW
- Body Scrub - 25,000 FRW
- Reflexology Massage - 30,000 FRW

## Contact

- **Address**: KG 526 St, Kigali, Rwanda
- **Phone**: +250 787 891 778
- **Website**: www.nunuspa.com
- **Email**: info@nunuspa.com

## License

© 2026 Nunu Spa. All rights reserved.
"# nunuspa-massage" 

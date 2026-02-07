import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
    title: 'Nunu Spa Massage - Recharge Yourself | Kigali',
    description: 'From the moment you step through our doors, you\'ll be embraced by a haven of peace designed to relax your senses and rejuvenate your spirit. Located at KG 526 St, Kigali.',
    keywords: 'spa, massage, wellness, Kigali, Rwanda, deep tissue, Swedish massage, aromatherapy, hot stone massage',
    manifest: '/manifest.json',
    themeColor: '#8B7355',
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1,
    },
    openGraph: {
        title: 'Nunu Spa Massage - Recharge Yourself',
        description: 'Professional spa and massage services in Kigali. Book your relaxation session today.',
        url: 'https://www.nunuspa.com',
        type: 'website',
    },
}

import NavbarWrapper from '@/components/NavbarWrapper'
import InstallPrompt from '@/components/InstallPrompt'

// ... imports remain the same

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
            <body className={inter.className}>
                <NavbarWrapper />
                <InstallPrompt />
                {children}
            </body>
        </html>
    )
}

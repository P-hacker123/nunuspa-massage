'use client'

import { usePathname } from 'next/navigation'
import LocationContact from '@/components/LocationContact'

export default function GlobalMap() {
    const pathname = usePathname()
    // Don't show the global map on the contact page since it has its own
    // Don't show on the home page since it has the map in the Hero section
    // Don't show on admin pages
    const hideMap = pathname === '/contact' || pathname === '/' || pathname?.startsWith('/admin')

    if (hideMap) {
        return null
    }

    return <LocationContact />
}

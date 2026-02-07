'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Sidebar from '@/components/admin/Sidebar'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const pathname = usePathname()
    const isLoginPage = pathname === '/admin/login'

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    useEffect(() => {
        if (isLoginPage) return

        // ... existing auth check code ...
        // Check if user is authenticated
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession()

            if (!session) {
                router.push('/admin/login')
            }
        }

        checkAuth()

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT' || !session) {
                router.push('/admin/login')
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [router, isLoginPage])

    if (isLoginPage) {
        return <>{children}</>
    }

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Mobile Header */}
                <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200 shrink-0">
                    <div className="flex items-center gap-2">
                        <h1 className="font-bold text-lg text-spa-gray-900">Nunu Spa Admin</h1>
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 text-spa-gray-600 hover:bg-spa-gray-100 rounded-lg transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                    </button>
                </header>

                <div className="flex-1 overflow-auto p-4 md:p-6 pb-24 md:pb-6">
                    {children}
                </div>
            </main>
        </div>
    )
}

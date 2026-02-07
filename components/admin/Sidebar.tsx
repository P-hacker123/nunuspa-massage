'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Calendar, MessageSquare, Settings, LogOut, Sparkles, Users } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Bookings', href: '/admin/bookings', icon: Calendar },
    { name: 'Services', href: '/admin/services', icon: Sparkles },
    { name: 'Team', href: '/admin/team', icon: Users },
    { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
]

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname()
    const router = useRouter()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/admin/login')
    }

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden animate-fadeIn"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-spa-gray-200 
                flex flex-col shadow-xl transition-transform duration-300 ease-in-out
                md:static md:shadow-none md:translate-x-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Logo/Brand */}
                <div className="p-6 border-b border-spa-gray-200 flex justify-between items-center">
                    <Link href="/admin/dashboard" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-spa-green-500 to-spa-green-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="font-bold text-lg text-spa-gray-900">Nunu Spa</h1>
                            <p className="text-xs text-spa-green-600 font-medium">Admin Panel</p>
                        </div>
                    </Link>
                    {/* Mobile Close Button */}
                    <button onClick={onClose} className="md:hidden text-spa-gray-500 hover:text-spa-green-600">
                        <LogOut className="w-5 h-5 rotate-180" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navigation.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={onClose} // Close sidebar on mobile when link clicked
                                className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200
                    ${isActive
                                        ? 'bg-gradient-to-r from-spa-green-500 to-spa-green-600 text-white shadow-md shadow-spa-green-500/30'
                                        : 'text-spa-gray-700 hover:bg-spa-gray-100 hover:text-spa-green-600'
                                    }
                  `}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
                                <span>{item.name}</span>
                            </Link>
                        )
                    })}
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-spa-gray-200">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-spa-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 font-medium"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        </>
    )
}

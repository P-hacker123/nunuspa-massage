'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Sparkles, Phone, Settings } from 'lucide-react'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '/services' },
        { name: 'About', href: '/about' },
        { name: 'Booking', href: '/booking' },
        { name: 'Contact', href: '/contact' },
    ]

    const isActive = (path: string) => {
        if (path === '/' && pathname === '/') return true
        if (path !== '/' && pathname.startsWith(path)) return true
        return false
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-spa-green-500 to-spa-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="font-serif text-2xl font-bold text-spa-gray-900">Nunu Spa</h1>
                            <p className="text-xs text-spa-green-600 font-medium">Massage & Wellness</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`font-medium transition-colors duration-200 relative group px-2 py-1 ${isActive(item.href)
                                    ? 'text-spa-green-600'
                                    : 'text-spa-gray-700 hover:text-spa-green-600'
                                    }`}
                            >
                                {item.name}
                                <span className={`absolute bottom-0 left-0 h-0.5 bg-spa-green-600 transition-all duration-300 ${isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                                    }`}></span>
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <a
                            href="tel:+250787891778"
                            className="flex items-center gap-2 text-spa-gray-700 hover:text-spa-green-600 transition-colors"
                        >
                            <Phone className="w-5 h-5" />
                            <span className="font-medium">+250 787 891 778</span>
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-spa-gray-700 hover:text-spa-green-600 transition-colors"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-spa-gray-100 animate-fadeIn text-sm">
                    <div className="px-6 py-4 space-y-3">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`block w-full text-left py-3 font-medium transition-colors border-b border-spa-gray-100 last:border-b-0 ${isActive(item.href)
                                    ? 'text-spa-green-600'
                                    : 'text-spa-gray-700 hover:text-spa-green-600'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="pt-2 flex flex-col gap-3">
                            <a
                                href="tel:+250787891778"
                                className="flex items-center gap-3 py-3 text-spa-gray-700 hover:text-spa-green-600 transition-colors border-b border-spa-gray-100"
                            >
                                <div className="w-8 h-8 rounded-full bg-spa-green-50 flex items-center justify-center text-spa-green-600">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <span className="font-medium">+250 787 891 778</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

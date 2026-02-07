'use client'

import { MessageCircle } from 'lucide-react'
import Link from 'next/link'

export default function WhatsAppButton() {
    return (
        <Link
            href="https://wa.me/250787891778?text=Hello Nunu Spa, I'd like to inquire about your services"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 group"
            aria-label="Chat on WhatsApp"
        >
            <div className="relative">
                {/* Pulsing background */}
                <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />

                {/* Button */}
                <div className="relative w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-300 group-hover:scale-110">
                    <MessageCircle className="w-8 h-8 text-white" fill="white" />
                </div>

                {/* Tooltip */}
                <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-spa-brown-darkest text-white px-4 py-2 rounded-lg whitespace-nowrap shadow-lg">
                        Chat on WhatsApp
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                            <div className="border-8 border-transparent border-l-spa-brown-darkest" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

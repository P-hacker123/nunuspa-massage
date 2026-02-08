'use client'

import { ArrowRight, MessageCircle, Leaf } from 'lucide-react'
import Link from 'next/link'
import MapEmbed from '@/components/MapEmbed'

export default function HeroSection() {
    const scrollToBooking = () => {
        document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20 bg-gradient-to-br from-spa-green-50 via-white to-spa-green-50">
            {/* Decorative elements */}
            <div className="absolute top-20 right-10 w-72 h-72 bg-spa-green-200/30 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-spa-green-300/20 rounded-full blur-3xl" style={{ animationDelay: '1s' }} />

            {/* Background Image (Subtle overlay for texture) */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <img
                    src="https://www.jacksonvillewellnesshub.com/uploads/1/0/7/2/10721986/editor/black-man-receiving-massage-compressed.jpg?1711134207"
                    alt="Relaxing massage background"
                    className="w-full h-full object-cover grayscale"
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Column: Content */}
                    <div className="text-center lg:text-left animate-fadeIn">
                        {/* Icon */}
                        <div className="mb-8 flex justify-center lg:justify-start">
                            <div className="w-16 h-16 bg-gradient-to-br from-spa-green-500 to-spa-green-600 rounded-2xl flex items-center justify-center shadow-xl animate-float">
                                <Leaf className="w-8 h-8 text-white" />
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-spa-gray-900 mb-6 leading-tight" style={{ animationDelay: '0.1s' }}>
                            Recharge Body,
                            <br />
                            <span className="text-spa-green-800">Refresh Spirit</span>
                        </h1>

                        <p className="text-lg md:text-xl text-spa-gray-700 font-medium max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed" style={{ animationDelay: '0.3s' }}>
                            Your sanctuary in the heart of Kigali. Experience expert massage therapies designed to rejuvenate your senses.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12" style={{ animationDelay: '0.5s' }}>
                            <button
                                onClick={scrollToBooking}
                                className="btn-spa btn-primary flex items-center gap-2 text-lg shadow-lg justify-center px-8 py-4"
                            >
                                <ArrowRight className="w-5 h-5" />
                                Book Now
                            </button>

                            <Link
                                href={`https://wa.me/250787891778?text=Hello Nunu Spa, I'd like to make a booking`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-spa btn-secondary flex items-center gap-2 text-lg shadow-lg justify-center px-8 py-4"
                            >
                                <MessageCircle className="w-5 h-5" />
                                WhatsApp Us
                            </Link>
                        </div>

                        {/* Stats - Horizontal on desktop */}
                        <div className="hidden lg:flex gap-8 border-t border-spa-gray-200 pt-8 mt-8">
                            <div>
                                <div className="text-2xl font-bold text-spa-green-600">10+</div>
                                <div className="text-sm text-spa-gray-500">Services</div>
                            </div>
                            <div className="w-px bg-spa-gray-200"></div>
                            <div>
                                <div className="text-2xl font-bold text-spa-green-600">100%</div>
                                <div className="text-sm text-spa-gray-500">Natural</div>
                            </div>
                            <div className="w-px bg-spa-gray-200"></div>
                            <div>
                                <div className="text-2xl font-bold text-spa-green-600">Expert</div>
                                <div className="text-sm text-spa-gray-500">Staff</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Map & Image Card */}
                    <div className="relative animate-fadeInRight hidden lg:block">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-spa-green-200 to-spa-gold/20 rounded-[2.5rem] blur-xl opacity-70 animate-pulse-slow"></div>
                        <div className="relative bg-white p-2 rounded-[2rem] shadow-2xl skew-y-1 hover:skew-y-0 transition-transform duration-700 ease-out">
                            <div className="relative h-[500px] w-full bg-spa-gray-100 rounded-[1.8rem] overflow-hidden border border-spa-gray-100">
                                <MapEmbed className="transition-all duration-700" />

                                {/* Overlay Card */}
                                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-spa-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Leaf className="w-5 h-5 text-spa-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-spa-gray-900 text-sm">Conveniently Located</p>
                                            <p className="text-xs text-spa-gray-600">KG 526 St, Kigali</p>
                                            <p className="text-xs text-spa-green-600 font-medium mt-1">Free Parking Available</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Map View (Simpler) */}
                    <div className="lg:hidden mt-8">
                        <div className="bg-white p-2 rounded-2xl shadow-lg border border-spa-gray-100">
                            <div className="h-[300px] rounded-xl overflow-hidden">
                                <MapEmbed />
                            </div>
                            <div className="p-4 text-center">
                                <p className="text-sm text-spa-gray-500">Visit us at KG 526 St, Kigali</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

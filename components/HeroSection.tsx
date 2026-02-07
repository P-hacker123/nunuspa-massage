'use client'

import { ArrowRight, MessageCircle, Leaf } from 'lucide-react'
import Link from 'next/link'

export default function HeroSection() {
    const scrollToBooking = () => {
        document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-br from-spa-green-50 via-white to-spa-green-50">
            {/* Decorative elements */}
            <div className="absolute top-20 right-10 w-72 h-72 bg-spa-green-200/30 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-spa-green-300/20 rounded-full blur-3xl" style={{ animationDelay: '1s' }} />

            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://www.jacksonvillewellnesshub.com/uploads/1/0/7/2/10721986/editor/black-man-receiving-massage-compressed.jpg?1711134207"
                    alt="Relaxing massage"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-white/50" /> {/* Light overlay for text readability */}
            </div>

            {/* Content */}
            <div className="relative z-20 text-center px-6 max-w-6xl mx-auto animate-fadeIn">
                <div className="bg-white/30 backdrop-blur-sm p-12 rounded-3xl border border-white/50 shadow-2xl">
                    {/* Icon */}
                    <div className="mb-8 flex justify-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-spa-green-500 to-spa-green-600 rounded-2xl flex items-center justify-center shadow-xl animate-float">
                            <Leaf className="w-10 h-10 text-white" />
                        </div>
                    </div>

                    {/* Main headline */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-spa-gray-900 mb-6 leading-tight animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                        Recharge Your Body,
                        <br />
                        <span className="text-spa-green-800">Refresh Your Spirit</span>
                    </h1>

                    {/* Subtext */}
                    <p className="text-lg md:text-xl text-spa-gray-800 font-medium max-w-3xl mx-auto mb-12 leading-relaxed animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                        From the moment you step through our doors, you'll be embraced by a haven of peace
                        designed to relax your senses and rejuvenate your spirit.
                    </p>

                    {/* CTA buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeIn" style={{ animationDelay: '0.5s' }}>
                        <button
                            onClick={scrollToBooking}
                            className="btn-spa btn-primary flex items-center gap-2 text-lg shadow-lg min-w-[200px] justify-center"
                        >
                            <ArrowRight className="w-5 h-5" />
                            Book Now
                        </button>

                        <Link
                            href={`https://wa.me/250787891778?text=Hello Nunu Spa, I'd like to make a booking`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-spa btn-secondary flex items-center gap-2 text-lg shadow-lg min-w-[200px] justify-center"
                        >
                            <MessageCircle className="w-5 h-5" />
                            WhatsApp Us
                        </Link>
                    </div>
                </div>

                {/* Stats/Features */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <div className="animate-fadeIn bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/50" style={{ animationDelay: '0.7s' }}>
                        <div className="text-4xl font-bold text-spa-green-600 mb-2">10+</div>
                        <div className="text-spa-gray-600 font-medium">Massage Services</div>
                    </div>
                    <div className="animate-fadeIn bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/50" style={{ animationDelay: '0.8s' }}>
                        <div className="text-4xl font-bold text-spa-green-600 mb-2">100%</div>
                        <div className="text-spa-gray-600 font-medium">Natural Products</div>
                    </div>
                    <div className="animate-fadeIn bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/50" style={{ animationDelay: '0.9s' }}>
                        <div className="text-4xl font-bold text-spa-green-600 mb-2">Expert</div>
                        <div className="text-spa-gray-600 font-medium">Therapists</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

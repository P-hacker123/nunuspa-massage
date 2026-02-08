// Navbar moved to layout
import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
import WhyChooseUs from '@/components/WhyChooseUs'
import WhatsAppButton from '@/components/WhatsAppButton'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Home() {
    return (
        <main className="min-h-screen">
            {/* Navbar is now in RootLayout */}
            <HeroSection />

            {/* Featured Services Teaser */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-spa-gray-900 mb-4">
                            Popular Treatments
                        </h2>
                        <p className="text-spa-gray-600 max-w-2xl mx-auto">
                            Experience our most loved relaxing therapies.
                        </p>
                    </div>
                    <ServicesSection limit={3} />
                    <div className="text-center mt-12">
                        <Link
                            href="/services"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-spa-green-600 text-white rounded-full font-medium hover:bg-spa-green-700 transition-colors"
                        >
                            View All Services
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            <WhyChooseUs />

            {/* CTA Section */}
            <section className="py-24 bg-spa-green-900 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                <div className="relative z-10 max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
                        Ready to Relax?
                    </h2>
                    <p className="text-spa-green-100 text-lg mb-8 max-w-2xl mx-auto">
                        Book your appointment today and let our expert therapists take care of you. Use our simple online booking system.
                    </p>
                    <Link
                        href="/booking"
                        className="inline-block px-10 py-4 bg-white text-spa-green-900 rounded-full font-bold hover:bg-spa-green-50 transition-colors shadow-xl hover:shadow-2xl hover:scale-105 transform duration-300"
                    >
                        Book Appointment Now
                    </Link>
                </div>
            </section>

            <WhatsAppButton />
        </main>
    )
}

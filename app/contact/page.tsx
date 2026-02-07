'use client'

import PageHeader from '@/components/PageHeader'
import ContactForm from '@/components/ContactForm'
import { MapPin, Phone, Mail, Globe, Clock, Sparkles } from 'lucide-react'
import { CONTACT, BUSINESS_HOURS } from '@/lib/constants'

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-20">
            <PageHeader
                title="Get in Touch"
                subtitle="We'd love to hear from you. Whether you have a question about our services or need help booking your perfect retreat."
            />

            {/* Main Content */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">

                        {/* Left Column: Contact Info & Map */}
                        <div className="space-y-12 animate-fadeInLeft">
                            <div>
                                <div className="inline-flex items-center gap-2 bg-spa-green-50 px-4 py-1.5 rounded-full text-spa-green-700 font-medium text-sm mb-6">
                                    <Sparkles className="w-4 h-4" />
                                    <span>Contact Us</span>
                                </div>
                                <h2 className="text-4xl font-serif font-bold text-spa-gray-900 mb-6">
                                    Visit Our Sanctuary
                                </h2>
                                <p className="text-lg text-spa-gray-600 leading-relaxed mb-8">
                                    Located in the heart of Kigali's most serene landscaped gardens, Nunu Spa offers an escape from the city bustle while remaining conveniently accessible.
                                </p>
                            </div>

                            {/* Contact Details Cards */}
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="bg-spa-gray-50/50 p-6 rounded-2xl border border-spa-gray-100 hover:shadow-md transition-shadow group">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-spa-green-600 mb-4 group-hover:scale-110 transition-transform">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-spa-gray-900 mb-2">Visit Us</h3>
                                    <p className="text-sm text-spa-gray-600 leading-relaxed text-wrap">
                                        {CONTACT.address}<br />
                                        Kigali, Rwanda
                                    </p>
                                </div>

                                <div className="bg-spa-gray-50/50 p-6 rounded-2xl border border-spa-gray-100 hover:shadow-md transition-shadow group">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-spa-green-600 mb-4 group-hover:scale-110 transition-transform">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-spa-gray-900 mb-2">Call Us</h3>
                                    <p className="text-sm text-spa-gray-600">
                                        {CONTACT.phone}<br />
                                        Mon-Fri from 8am to 8pm
                                    </p>
                                </div>

                                <div className="bg-spa-gray-50/50 p-6 rounded-2xl border border-spa-gray-100 hover:shadow-md transition-shadow group">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-spa-green-600 mb-4 group-hover:scale-110 transition-transform">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-spa-gray-900 mb-2">Email Us</h3>
                                    <p className="text-sm text-spa-gray-600 break-words">
                                        {CONTACT.email}<br />
                                        We reply within 24 hours
                                    </p>
                                </div>

                                <div className="bg-spa-gray-50/50 p-6 rounded-2xl border border-spa-gray-100 hover:shadow-md transition-shadow group">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-spa-green-600 mb-4 group-hover:scale-110 transition-transform">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-spa-gray-900 mb-2">Open Hours</h3>
                                    <p className="text-sm text-spa-gray-600">
                                        {BUSINESS_HOURS.weekdays}<br />
                                        {BUSINESS_HOURS.weekends}
                                    </p>
                                </div>
                            </div>

                            {/* Map */}
                            <div className="h-[300px] w-full bg-spa-gray-100 rounded-3xl overflow-hidden shadow-lg border border-spa-gray-200">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.5198629928!2d30.0622!3d-1.9536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwNTcnMTMuMCJTIDMwwrAwMycxOS45IkU!5e0!3m2!1sen!2srw!4v1234567890"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="grayscale hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                        </div>

                        {/* Right Column: Contact Form */}
                        <div className="relative animate-fadeInRight">
                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-spa-green-100 rounded-full blur-3xl opacity-30" />
                            <div className="relative bg-white rounded-3xl shadow-xl border border-spa-gray-100 p-8 lg:p-10">
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-spa-gray-900 mb-2">Send us a Message</h3>
                                    <p className="text-spa-gray-600">Fill out the form below and we'll get back to you shortly.</p>
                                </div>
                                <ContactForm />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    )
}

'use client'

import { MapPin, Phone, Mail, Globe, Clock } from 'lucide-react'
import { CONTACT, BUSINESS_HOURS } from '@/lib/constants'
import MapEmbed from '@/components/MapEmbed'

export default function LocationContact() {
    return (
        <section id="contact" className="py-20 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-spa-gray-900 mb-4">
                        Visit Us
                    </h2>
                    <p className="text-lg text-spa-gray-600">
                        We're in the heart of Kigali, ready to welcome you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Google Maps */}
                    <div className="rounded-2xl overflow-hidden shadow-spa-lg h-[400px]">
                        <MapEmbed />
                    </div>

                    {/* Contact information */}
                    <div className="space-y-8">
                        {/* Address */}
                        <div className="flex items-start gap-4 group">
                            <div className="w-12 h-12 bg-spa-green-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-spa-green-200 transition-colors">
                                <MapPin className="w-6 h-6 text-spa-green-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-spa-gray-900 mb-2">Address</h3>
                                <p className="text-spa-gray-600">{CONTACT.address}</p>
                                <p className="text-spa-gray-600">Kigali, Rwanda</p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-start gap-4 group">
                            <div className="w-12 h-12 bg-spa-green/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-spa-green/20 transition-colors">
                                <Phone className="w-6 h-6 text-spa-green-dark" />
                            </div>
                            <div>
                                <h3 className="text-xl font-serif text-spa-brown-darkest mb-2">Phone</h3>
                                <a
                                    href={`tel:${CONTACT.phone}`}
                                    className="text-spa-brown-dark hover:text-spa-brown transition-colors"
                                >
                                    {CONTACT.phone}
                                </a>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-start gap-4 group">
                            <div className="w-12 h-12 bg-spa-gold/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-spa-gold/20 transition-colors">
                                <Mail className="w-6 h-6 text-spa-gold" />
                            </div>
                            <div>
                                <h3 className="text-xl font-serif text-spa-brown-darkest mb-2">Email</h3>
                                <a
                                    href={`mailto:${CONTACT.email}`}
                                    className="text-spa-brown-dark hover:text-spa-brown transition-colors"
                                >
                                    {CONTACT.email}
                                </a>
                            </div>
                        </div>

                        {/* Website */}
                        <div className="flex items-start gap-4 group">
                            <div className="w-12 h-12 bg-spa-brown/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-spa-brown/20 transition-colors">
                                <Globe className="w-6 h-6 text-spa-brown" />
                            </div>
                            <div>
                                <h3 className="text-xl font-serif text-spa-brown-darkest mb-2">Website</h3>
                                <p className="text-spa-brown-dark">{CONTACT.website}</p>
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="flex items-start gap-4 group">
                            <div className="w-12 h-12 bg-spa-green/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-spa-green/20 transition-colors">
                                <Clock className="w-6 h-6 text-spa-green-dark" />
                            </div>
                            <div>
                                <h3 className="text-xl font-serif text-spa-brown-darkest mb-2">Business Hours</h3>
                                <p className="text-spa-brown-dark">{BUSINESS_HOURS.weekdays}</p>
                                <p className="text-spa-brown-dark">{BUSINESS_HOURS.weekends}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

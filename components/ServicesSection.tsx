'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { servicesService } from '@/lib/supabase'
import { SERVICES } from '@/lib/constants'
import { Service } from '@/types'
import { Sparkles, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function ServicesSection({ limit }: { limit?: number }) {
    const [services, setServices] = useState<Service[]>(SERVICES)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchServices = async () => {
            // In a real app we might limit at the query level, but client-side slice is fine for now
            try {
                const data = await servicesService.getAll()
                if (data && data.length > 0) {
                    setServices(data)
                }
            } catch (error) {
                console.error('Failed to load services:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchServices()
    }, [])

    const displayedServices = limit ? services.slice(0, limit) : services

    return (
        <section id="services" className="py-24 px-6 bg-gradient-to-b from-white via-spa-green-50/30 to-white relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-spa-green-200/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-spa-green-100/30 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section header only if not limited (full page mode) */}
                {!limit && (
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 bg-white shadow-md px-6 py-3 rounded-full mb-6 border border-spa-green-100">
                            <Sparkles className="w-5 h-5 text-spa-green-600" />
                            <span className="text-spa-green-700 font-semibold">Our Premium Services</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-spa-gray-900 mb-6 leading-tight">
                            Therapeutic Treatments
                        </h2>
                        <p className="text-xl text-spa-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Experience healing through our expertly crafted massage therapies, designed to restore balance and vitality
                        </p>
                    </div>
                )}

                {/* Services grid - Ultra Modern Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedServices.map((service, index) => (
                        <div
                            key={service.id || index}
                            className="bg-white rounded-2xl p-0 shadow-lg hover:shadow-2xl transition-all duration-300 group border border-spa-gray-100 flex flex-col h-full overflow-hidden relative"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Image Header if available */}
                            {service.image_url ? (
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={service.image_url}
                                        alt={service.name}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                            (e.target as HTMLImageElement).parentElement!.style.display = 'none';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-spa-green-700 font-bold text-sm shadow-sm">
                                        {service.duration}
                                    </div>
                                </div>
                            ) : null}

                            <div className={`flex flex-col flex-1 p-8 ${!service.image_url ? 'relative z-10' : ''}`}>

                                {!service.image_url && (
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-14 h-14 bg-spa-green-50 rounded-2xl flex items-center justify-center text-spa-green-600 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                            <Sparkles className="w-7 h-7" />
                                        </div>
                                    </div>
                                )}

                                <div className="mb-4">
                                    <h3 className="text-2xl font-serif font-bold text-spa-gray-900 mb-2 group-hover:text-spa-green-700 transition-colors">
                                        {service.name}
                                    </h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-bold text-spa-green-600">
                                            {service.price.toLocaleString()}
                                        </span>
                                        <span className="text-sm font-medium text-spa-gray-400">FRW</span>
                                    </div>
                                </div>

                                <p className="text-spa-gray-600 mb-6 flex-grow leading-relaxed">
                                    {service.description}
                                </p>

                                <div className="space-y-4 mt-auto">
                                    {!service.image_url && (
                                        <div className="flex items-center gap-2 text-sm text-spa-gray-500 font-medium">
                                            <Clock className="w-4 h-4 text-spa-green-500" />
                                            <span>{service.duration}</span>
                                        </div>
                                    )}

                                    <Link
                                        href="/booking"
                                        className="w-full py-3 rounded-xl border-2 border-spa-green-100 text-spa-green-700 font-bold hover:bg-spa-green-600 hover:text-white hover:border-spa-green-600 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                                    >
                                        Book Now
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

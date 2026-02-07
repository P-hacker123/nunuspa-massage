'use client'

import { useState, useEffect } from 'react'
import { SERVICES } from '@/lib/constants'
import { bookingService, supabase } from '@/lib/supabase'
import { Calendar, Clock, User, Phone, Sparkles, CheckCircle } from 'lucide-react'

export default function BookingSection() {
    const [services, setServices] = useState(SERVICES)
    const [formData, setFormData] = useState({
        full_name: '',
        phone_number: '',
        service_type: '',
        preferred_date: '',
        preferred_time: '',
    })

    useEffect(() => {
        const fetchServices = async () => {
            const { data } = await supabase
                .from('services')
                .select('*')
                .order('name', { ascending: true })

            if (data && data.length > 0) {
                setServices(data)
            }
        }
        fetchServices()
    }, [])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError('')

        try {
            await bookingService.create({
                ...formData,
                status: 'pending',
            })

            setShowSuccess(true)
            setFormData({
                full_name: '',
                phone_number: '',
                service_type: '',
                preferred_date: '',
                preferred_time: '',
            })

            // Hide success message after 5 seconds
            setTimeout(() => setShowSuccess(false), 5000)
        } catch (err: any) {
            setError(err.message || 'Failed to book. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <section id="booking" className="py-24 px-6 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-spa-green-50 via-white to-spa-green-50/50" />
            <div className="absolute top-0 left-0 w-96 h-96 bg-spa-green-200/30 rounded-full blur-3xl" />

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Section header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-white shadow-md px-6 py-3 rounded-full mb-6 border border-spa-green-100">
                        <Calendar className="w-5 h-5 text-spa-green-600" />
                        <span className="text-spa-green-700 font-semibold">Book Your Session</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-bold text-spa-gray-900 mb-6">
                        Reserve Your Moment of Peace
                    </h2>
                    <p className="text-xl text-spa-gray-600 max-w-2xl mx-auto">
                        Your body deserves more than a break. It needs a session.
                    </p>
                </div>

                {/* Booking form */}
                <div className="card-spa max-w-2xl mx-auto">
                    {showSuccess ? (
                        <div className="text-center py-12 animate-fadeIn">
                            <div className="w-20 h-20 bg-spa-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-12 h-12 text-spa-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-spa-gray-900 mb-3">
                                Booking Confirmed!
                            </h3>
                            <p className="text-spa-gray-600 mb-6">
                                We've received your booking request. Our team will contact you shortly to confirm your appointment.
                            </p>
                            <button
                                onClick={() => setShowSuccess(false)}
                                className="btn-spa btn-primary"
                            >
                                Make Another Booking
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Full Name */}
                            <div>
                                <label className="flex items-center gap-2 text-spa-gray-900 font-medium mb-2">
                                    <User className="w-5 h-5" />
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-5 py-4 bg-white border-2 border-spa-gray-200 rounded-xl focus:border-spa-green-500 focus:ring-4 focus:ring-spa-green-100 focus:outline-none transition-all duration-300 text-spa-gray-900 placeholder:text-spa-gray-400"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label className="flex items-center gap-2 text-spa-gray-900 font-medium mb-2">
                                    <Phone className="w-5 h-5" />
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone_number"
                                    value={formData.phone_number}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-5 py-4 bg-white border-2 border-spa-gray-200 rounded-xl focus:border-spa-green-500 focus:ring-4 focus:ring-spa-green-100 focus:outline-none transition-all duration-300 text-spa-gray-900 placeholder:text-spa-gray-400"
                                    placeholder="+250 XXX XXX XXX"
                                />
                            </div>

                            {/* Service Type */}
                            <div>
                                <label className="flex items-center gap-2 text-spa-gray-900 font-medium mb-2">
                                    <Sparkles className="w-5 h-5" />
                                    Service Type
                                </label>
                                <select
                                    name="service_type"
                                    value={formData.service_type}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-5 py-4 bg-white border-2 border-spa-gray-200 rounded-xl focus:border-spa-green-500 focus:ring-4 focus:ring-spa-green-100 focus:outline-none transition-all duration-300 text-spa-gray-900 appearance-none cursor-pointer"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                                        backgroundPosition: 'right 1rem center',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: '1.5em 1.5em',
                                    }}
                                >
                                    <option value="">Select a service</option>
                                    {services.map((service) => (
                                        <option key={service.id || service.name} value={service.name}>
                                            {service.name} - {service.price.toLocaleString()} FRW
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Selected Service Details */}
                            {formData.service_type && (
                                <div className="bg-spa-green-50 rounded-xl p-4 border border-spa-green-100 animate-fadeIn">
                                    {(() => {
                                        const service = services.find(s => s.name === formData.service_type)
                                        if (!service) return null
                                        return (
                                            <div className="flex gap-4 items-start">
                                                {service.image_url ? (
                                                    <img
                                                        src={service.image_url}
                                                        alt={service.name}
                                                        className="w-20 h-20 object-cover rounded-lg shadow-sm"
                                                    />
                                                ) : (
                                                    <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center shrink-0">
                                                        <Sparkles className="w-8 h-8 text-spa-green-500" />
                                                    </div>
                                                )}
                                                <div>
                                                    <h4 className="font-bold text-spa-gray-900">{service.name}</h4>
                                                    <div className="flex items-center gap-3 mt-1 text-sm text-spa-gray-600">
                                                        <span className="font-semibold text-spa-green-700">{service.price.toLocaleString()} FRW</span>
                                                        <span>•</span>
                                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {service.duration}</span>
                                                    </div>
                                                    <p className="text-sm text-spa-gray-500 mt-2 line-clamp-2">{service.description}</p>
                                                </div>
                                            </div>
                                        )
                                    })()}
                                </div>
                            )}

                            {/* Date and Time */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="flex items-center gap-2 text-spa-gray-900 font-medium mb-2">
                                        <Calendar className="w-5 h-5" />
                                        Preferred Date
                                    </label>
                                    <input
                                        type="date"
                                        name="preferred_date"
                                        value={formData.preferred_date}
                                        onChange={handleChange}
                                        required
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full px-5 py-4 bg-white border-2 border-spa-gray-200 rounded-xl focus:border-spa-green-500 focus:ring-4 focus:ring-spa-green-100 focus:outline-none transition-all duration-300 text-spa-gray-900 placeholder:text-spa-gray-400"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-spa-gray-900 font-medium mb-2">
                                        <Clock className="w-5 h-5" />
                                        Preferred Time
                                    </label>
                                    <input
                                        type="time"
                                        name="preferred_time"
                                        value={formData.preferred_time}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-5 py-4 bg-white border-2 border-spa-gray-200 rounded-xl focus:border-spa-green-500 focus:ring-4 focus:ring-spa-green-100 focus:outline-none transition-all duration-300 text-spa-gray-900 placeholder:text-spa-gray-400"
                                    />
                                </div>
                            </div>

                            {/* Error message */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                    {error}
                                </div>
                            )}

                            {/* Submit button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full btn-spa btn-primary text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Booking...' : 'Confirm Booking'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    )
}

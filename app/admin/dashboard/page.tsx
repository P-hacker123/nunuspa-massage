'use client'

import { useEffect, useState } from 'react'
import { bookingService } from '@/lib/supabase'
import { Booking } from '@/types'
import { Calendar, CheckCircle, Clock, TrendingUp } from 'lucide-react'

export default function AdminDashboardPage() {
    const [bookings, setBookings] = useState<Booking[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadBookings()
    }, [])

    const loadBookings = async () => {
        try {
            const data = await bookingService.getAll()
            setBookings(data)
        } catch (error) {
            console.error('Error loading bookings:', error)
        } finally {
            setLoading(false)
        }
    }

    const stats = [
        {
            name: 'Total Bookings',
            value: bookings.length,
            icon: Calendar,
            color: 'from-spa-green-500 to-spa-green-600',
            textColor: 'text-spa-green-600',
            bgColor: 'bg-spa-green-50',
        },
        {
            name: 'Pending',
            value: bookings.filter((b) => b.status === 'pending').length,
            icon: Clock,
            color: 'from-yellow-500 to-yellow-600',
            textColor: 'text-yellow-600',
            bgColor: 'bg-yellow-50',
        },
        {
            name: 'Confirmed',
            value: bookings.filter((b) => b.status === 'confirmed').length,
            icon: CheckCircle,
            color: 'from-blue-500 to-blue-600',
            textColor: 'text-blue-600',
            bgColor: 'bg-blue-50',
        },
        {
            name: 'Completed',
            value: bookings.filter((b) => b.status === 'completed').length,
            icon: TrendingUp,
            color: 'from-purple-500 to-purple-600',
            textColor: 'text-purple-600',
            bgColor: 'bg-purple-50',
        },
    ]

    const recentBookings = bookings.slice(0, 5)

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-spa-gray-900 mb-2">Dashboard</h1>
                <p className="text-spa-gray-600">Welcome back! Here's your spa overview.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => {
                    const Icon = stat.icon
                    return (
                        <div
                            key={stat.name}
                            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-spa-gray-100 group hover:-translate-y-1"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                    <Icon className={`w-6 h-6 ${stat.textColor}`} />
                                </div>
                            </div>
                            <div className={`text-4xl font-bold mb-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                {loading ? '...' : stat.value}
                            </div>
                            <div className="text-sm text-spa-gray-600 font-medium">{stat.name}</div>
                        </div>
                    )
                })}
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-spa-gray-100">
                <h2 className="text-2xl font-bold text-spa-gray-900 mb-6">Recent Bookings</h2>

                {loading ? (
                    <div className="text-center py-8 text-spa-gray-500">Loading...</div>
                ) : recentBookings.length === 0 ? (
                    <div className="text-center py-8 text-spa-gray-500">No bookings yet</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-spa-gray-200">
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-spa-gray-700">Customer</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-spa-gray-700">Service</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-spa-gray-700">Date</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-spa-gray-700">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentBookings.map((booking) => (
                                    <tr key={booking.id} className="border-b border-spa-gray-100 hover:bg-spa-gray-50 transition-colors">
                                        <td className="py-4 px-4">
                                            <div className="font-medium text-spa-gray-900">{booking.full_name}</div>
                                            <div className="text-sm text-spa-gray-500">{booking.phone_number}</div>
                                        </td>
                                        <td className="py-4 px-4 text-spa-gray-700">{booking.service_type}</td>
                                        <td className="py-4 px-4 text-spa-gray-700">
                                            {new Date(booking.preferred_date).toLocaleDateString()}
                                        </td>
                                        <td className="py-4 px-4">
                                            <span
                                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'pending'
                                                        ? 'bg-yellow-100 text-yellow-700'
                                                        : booking.status === 'confirmed'
                                                            ? 'bg-blue-100 text-blue-700'
                                                            : 'bg-purple-100 text-purple-700'
                                                    }`}
                                            >
                                                {booking.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

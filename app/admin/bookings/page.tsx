'use client'

import { useEffect, useState } from 'react'
import { bookingService, supabase } from '@/lib/supabase'
import { Booking } from '@/types'
import { Calendar, Trash2, Search, Filter } from 'lucide-react'

export default function BookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([])
    const [filteredBookings, setFilteredBookings] = useState<Booking[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadBookings()

        // Subscribe to realtime changes
        const channel = supabase
            .channel('bookings-changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, () => {
                loadBookings()
            })
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    useEffect(() => {
        // Filter bookings
        let filtered = bookings

        if (searchTerm) {
            filtered = filtered.filter(
                (b) =>
                    b.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    b.service_type.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        if (filterStatus !== 'all') {
            filtered = filtered.filter((b) => b.status === filterStatus)
        }

        setFilteredBookings(filtered)
    }, [bookings, searchTerm, filterStatus])

    const loadBookings = async () => {
        try {
            const data = await bookingService.getAll()
            setBookings(data)
            setFilteredBookings(data)
        } catch (error) {
            console.error('Failed to load bookings:', error)
        } finally {
            setLoading(false)
        }
    }

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            await bookingService.updateStatus(id, newStatus)
            loadBookings()
        } catch (error) {
            console.error('Failed to update status:', error)
        }
    }

    const deleteBooking = async (id: string) => {
        if (!confirm('Are you sure you want to delete this booking?')) return

        try {
            await bookingService.delete(id)
            loadBookings()
        } catch (error) {
            console.error('Failed to delete booking:', error)
        }
    }

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-spa-gray-900 mb-2">Bookings Management</h1>
                <p className="text-spa-gray-600">View and manage all customer bookings</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-spa-gray-100">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-spa-gray-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by name or service..."
                            className="w-full pl-12 pr-4 py-3 bg-spa-gray-50 border-2 border-transparent rounded-xl focus:border-spa-green-500 focus:bg-white focus:outline-none transition-all"
                        />
                    </div>

                    {/* Status filter */}
                    <div className="relative">
                        <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-spa-gray-400" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="pl-12 pr-8 py-3 bg-spa-gray-50 border-2 border-transparent rounded-xl focus:border-spa-green-500 focus:bg-white focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Bookings table */}
            <div className="bg-white rounded-2xl shadow-lg border border-spa-gray-100 overflow-hidden">
                {loading ? (
                    <div className="text-center py-12 text-spa-gray-500">Loading bookings...</div>
                ) : filteredBookings.length === 0 ? (
                    <div className="text-center py-12">
                        <Calendar className="w-16 h-16 text-spa-gray-300 mx-auto mb-4" />
                        <p className="text-spa-gray-500">No bookings found</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-spa-gray-50">
                                <tr className="border-b border-spa-gray-200">
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-spa-gray-700">Name</th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-spa-gray-700">Phone</th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-spa-gray-700">Service</th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-spa-gray-700">Date</th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-spa-gray-700">Time</th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-spa-gray-700">Status</th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-spa-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBookings.map((booking) => (
                                    <tr key={booking.id} className="border-b border-spa-gray-100 hover:bg-spa-gray-50 transition-colors">
                                        <td className="py-4 px-6 text-spa-gray-900 font-medium">{booking.full_name}</td>
                                        <td className="py-4 px-6 text-spa-gray-600">{booking.phone_number}</td>
                                        <td className="py-4 px-6 text-spa-gray-700">{booking.service_type}</td>
                                        <td className="py-4 px-6 text-spa-gray-700">{booking.preferred_date}</td>
                                        <td className="py-4 px-6 text-spa-gray-700">{booking.preferred_time}</td>
                                        <td className="py-4 px-6">
                                            <select
                                                value={booking.status}
                                                onChange={(e) => updateStatus(booking.id!, e.target.value)}
                                                className={`px-3 py-1.5 rounded-full text-xs font-semibold border-0 focus:outline-none focus:ring-2 cursor-pointer ${booking.status === 'pending'
                                                        ? 'bg-yellow-100 text-yellow-700 focus:ring-yellow-300'
                                                        : booking.status === 'confirmed'
                                                            ? 'bg-blue-100 text-blue-700 focus:ring-blue-300'
                                                            : 'bg-purple-100 text-purple-700 focus:ring-purple-300'
                                                    }`}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="confirmed">Confirmed</option>
                                                <option value="completed">Completed</option>
                                            </select>
                                        </td>
                                        <td className="py-4 px-6">
                                            <button
                                                onClick={() => deleteBooking(booking.id!)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete booking"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
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

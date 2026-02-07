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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                        {filteredBookings.map((booking) => (
                            <div key={booking.id} className="bg-spa-gray-50 rounded-2xl p-5 border border-spa-gray-100 hover:shadow-md transition-all flex flex-col h-full bg-white">
                                {/* Header */}
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="font-bold text-lg text-spa-gray-900">{booking.full_name}</div>
                                        <div className="text-sm text-spa-gray-500 font-mono">{booking.phone_number}</div>
                                    </div>
                                    <button
                                        onClick={() => deleteBooking(booking.id!)}
                                        className="text-spa-gray-400 hover:text-red-500 transition-colors p-1"
                                        title="Delete booking"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Body */}
                                <div className="space-y-3 flex-1 mb-6">
                                    <div className="flex items-center text-sm text-spa-gray-700 bg-spa-gray-50 p-2 rounded-lg">
                                        <span className="font-semibold w-16 text-xs uppercase tracking-wider text-spa-gray-400">Service</span>
                                        <span className="font-medium">{booking.service_type}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-spa-gray-700 bg-spa-gray-50 p-2 rounded-lg">
                                        <span className="font-semibold w-16 text-xs uppercase tracking-wider text-spa-gray-400">Date</span>
                                        <span className="font-medium">{booking.preferred_date}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-spa-gray-700 bg-spa-gray-50 p-2 rounded-lg">
                                        <span className="font-semibold w-16 text-xs uppercase tracking-wider text-spa-gray-400">Time</span>
                                        <span className="font-medium">{booking.preferred_time}</span>
                                    </div>
                                </div>

                                {/* Footer / Actions */}
                                <div className="pt-4 border-t border-spa-gray-100">
                                    <label className="block text-xs font-semibold text-spa-gray-400 mb-2 uppercase tracking-wider">Status</label>
                                    <select
                                        value={booking.status}
                                        onChange={(e) => updateStatus(booking.id!, e.target.value)}
                                        className={`w-full px-4 py-2 rounded-xl text-sm font-bold border-2 cursor-pointer transition-colors ${booking.status === 'pending'
                                            ? 'bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100'
                                            : booking.status === 'confirmed'
                                                ? 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
                                                : 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100'
                                            }`}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

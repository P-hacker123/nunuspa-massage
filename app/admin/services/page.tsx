'use client'

import { useEffect, useState } from 'react'
import { servicesService, supabase } from '@/lib/supabase'
import { Service } from '@/types'
import { Plus, Pencil, Trash2, X, Save, Sparkles } from 'lucide-react'

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingService, setEditingService] = useState<Service | null>(null)
    const [formData, setFormData] = useState<Partial<Service>>({
        name: '',
        description: '',
        price: 0,
        duration: '',
        image_url: '',
    })

    useEffect(() => {
        loadServices()
    }, [])

    const loadServices = async () => {
        try {
            const data = await servicesService.getAll()
            setServices(data)
        } catch (error) {
            console.error('Failed to load services:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (editingService) {
                await servicesService.update(editingService.id, formData)
            } else {
                await servicesService.create(formData)
            }
            setIsModalOpen(false)
            setEditingService(null)
            setFormData({ name: '', description: '', price: 0, duration: '' })
            loadServices()
        } catch (error) {
            console.error('Failed to save service:', error)
            alert('Failed to save service. Please try again.')
        }
    }

    const handleEdit = (service: Service) => {
        setEditingService(service)
        setFormData({
            name: service.name,
            description: service.description,
            price: service.price,
            duration: service.duration || '',
            image_url: service.image_url || '',
        })
        setIsModalOpen(true)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return
        try {
            await servicesService.delete(id)
            loadServices()
        } catch (error) {
            console.error('Failed to delete service:', error)
        }
    }

    const openNewModal = () => {
        setEditingService(null)
        setFormData({ name: '', description: '', price: 0, duration: '', image_url: '' })
        setIsModalOpen(true)
    }

    if (isLoading) {
        return <div className="p-8 text-center text-spa-gray-500">Loading services...</div>
    }

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-spa-gray-900 mb-2">Services Management</h1>
                    <p className="text-spa-gray-600">Manage your spa treatment offerings</p>
                </div>
                <button
                    onClick={openNewModal}
                    className="btn-spa btn-primary flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Add Service
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <div key={service.id} className="bg-white rounded-2xl shadow-lg border border-spa-gray-100 p-6 group hover:shadow-xl transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-16 h-16 bg-spa-green-100 rounded-xl overflow-hidden flex items-center justify-center text-spa-green-600 shrink-0">
                                {service.image_url ? (
                                    <img
                                        src={service.image_url}
                                        alt={service.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none'
                                        }}
                                    />
                                ) : (
                                    <Sparkles className="w-6 h-6" />
                                )}
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleEdit(service)}
                                    className="p-2 text-spa-green-600 hover:bg-spa-green-50 rounded-lg transition-colors"
                                >
                                    <Pencil className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(service.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-spa-gray-900 mb-2">{service.name}</h3>
                        <p className="text-spa-gray-600 text-sm mb-4 line-clamp-3">{service.description}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-spa-gray-100">
                            <span className="text-spa-green-600 font-bold text-lg">
                                {service.price.toLocaleString()} FRW
                            </span>
                            <span className="text-xs font-medium bg-spa-gray-100 text-spa-gray-600 px-3 py-1 rounded-full">
                                {service.duration}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 animate-fadeIn">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-spa-gray-900">
                                {editingService ? 'Edit Service' : 'Add New Service'}
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 text-spa-gray-400 hover:text-spa-gray-600 rounded-lg"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-spa-gray-700 mb-1">Service Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 border border-spa-gray-200 rounded-xl focus:ring-2 focus:ring-spa-green-500 focus:border-transparent outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-spa-gray-700 mb-1">Price (FRW)</label>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                        required
                                        className="w-full px-4 py-2 border border-spa-gray-200 rounded-xl focus:ring-2 focus:ring-spa-green-500 focus:border-transparent outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-spa-gray-700 mb-1">Duration</label>
                                    <input
                                        type="text"
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                        required
                                        placeholder="e.g. 60 min"
                                        className="w-full px-4 py-2 border border-spa-gray-200 rounded-xl focus:ring-2 focus:ring-spa-green-500 focus:border-transparent outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-spa-gray-700 mb-1">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-2 border border-spa-gray-200 rounded-xl focus:ring-2 focus:ring-spa-green-500 focus:border-transparent outline-none resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-spa-gray-700 mb-1">Service Image URL</label>
                                <input
                                    type="url"
                                    value={formData.image_url || ''}
                                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full px-4 py-2 border border-spa-gray-200 rounded-xl focus:ring-2 focus:ring-spa-green-500 focus:border-transparent outline-none"
                                />
                                <p className="text-xs text-spa-gray-500 mt-1">Optional. Link to an image for this service.</p>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-spa-gray-600 hover:bg-spa-gray-50 rounded-xl transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-spa-green-600 text-white rounded-xl hover:bg-spa-green-700 transition-colors font-medium flex items-center gap-2"
                                >
                                    <Save className="w-4 h-4" />
                                    Save Service
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

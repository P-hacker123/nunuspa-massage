'use client'

import { useEffect, useState } from 'react'
import { teamService } from '@/lib/supabase'
import { TeamMember } from '@/types'
import { Plus, Pencil, Trash2, X, Save, Users } from 'lucide-react'

export default function TeamPage() {
    const [members, setMembers] = useState<TeamMember[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
    const [formData, setFormData] = useState<Partial<TeamMember>>({
        name: '',
        role: '',
        bio: '',
        image_url: '',
    })

    useEffect(() => {
        loadMembers()
    }, [])

    const loadMembers = async () => {
        try {
            const data = await teamService.getAll()
            setMembers(data)
        } catch (error) {
            console.error('Failed to load team members:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (editingMember) {
                await teamService.update(editingMember.id, formData)
            } else {
                await teamService.create(formData)
            }
            setIsModalOpen(false)
            setEditingMember(null)
            setFormData({ name: '', role: '', bio: '', image_url: '' })
            loadMembers()
        } catch (error) {
            console.error('Failed to save team member:', error)
            alert('Failed to save team member. Please try again.')
        }
    }

    const handleEdit = (member: TeamMember) => {
        setEditingMember(member)
        setFormData({
            name: member.name,
            role: member.role,
            bio: member.bio,
            image_url: member.image_url || '',
        })
        setIsModalOpen(true)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this team member?')) return
        try {
            await teamService.delete(id)
            loadMembers()
        } catch (error) {
            console.error('Failed to delete team member:', error)
        }
    }

    const openNewModal = () => {
        setEditingMember(null)
        setFormData({ name: '', role: '', bio: '', image_url: '' })
        setIsModalOpen(true)
    }

    if (isLoading) {
        return <div className="p-8 text-center text-spa-gray-500">Loading team...</div>
    }

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-spa-gray-900 mb-2">Team Management</h1>
                    <p className="text-spa-gray-600">Manage your spa therapists and staff</p>
                </div>
                <button
                    onClick={openNewModal}
                    className="btn-spa btn-primary flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Add Member
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((member) => (
                    <div key={member.id} className="bg-white rounded-2xl shadow-lg border border-spa-gray-100 p-6 group hover:shadow-xl transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-20 h-20 bg-spa-gray-100 rounded-full overflow-hidden flex items-center justify-center text-spa-gray-400 shrink-0 border-2 border-white shadow-md">
                                {member.image_url ? (
                                    <img
                                        src={member.image_url}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none'
                                        }}
                                    />
                                ) : (
                                    <Users className="w-8 h-8" />
                                )}
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleEdit(member)}
                                    className="p-2 text-spa-green-600 hover:bg-spa-green-50 rounded-lg transition-colors"
                                >
                                    <Pencil className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(member.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-spa-gray-900 mb-1">{member.name}</h3>
                        <p className="text-spa-green-600 font-medium text-sm mb-4">{member.role}</p>
                        <p className="text-spa-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{member.bio}</p>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 animate-fadeIn">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-spa-gray-900">
                                {editingMember ? 'Edit Team Member' : 'Add New Member'}
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
                                <label className="block text-sm font-medium text-spa-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 border border-spa-gray-200 rounded-xl focus:ring-2 focus:ring-spa-green-500 focus:border-transparent outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-spa-gray-700 mb-1">Role / Title</label>
                                <input
                                    type="text"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    required
                                    placeholder="e.g. Senior Massage Therapist"
                                    className="w-full px-4 py-2 border border-spa-gray-200 rounded-xl focus:ring-2 focus:ring-spa-green-500 focus:border-transparent outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-spa-gray-700 mb-1">Bio</label>
                                <textarea
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-2 border border-spa-gray-200 rounded-xl focus:ring-2 focus:ring-spa-green-500 focus:border-transparent outline-none resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-spa-gray-700 mb-1">Profile Image URL</label>
                                <input
                                    type="url"
                                    value={formData.image_url || ''}
                                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                    placeholder="https://example.com/photo.jpg"
                                    className="w-full px-4 py-2 border border-spa-gray-200 rounded-xl focus:ring-2 focus:ring-spa-green-500 focus:border-transparent outline-none"
                                />
                                <p className="text-xs text-spa-gray-500 mt-1">Optional. Link to a profile photo.</p>
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
                                    Save Member
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

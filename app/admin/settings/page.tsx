'use client'

import { useEffect, useState } from 'react'
import { settingsService, supabase } from '@/lib/supabase'
import { Settings as SettingsType } from '@/types'
import { Save, Phone, MapPin, Loader2, CheckCircle, Shield, UserPlus, Lock, User } from 'lucide-react'

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<'general' | 'security'>('general')
    const [settings, setSettings] = useState<SettingsType>({
        phone_number: '+250 787 891 778',
        maps_embed_url: '',
    })
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [saveMessage, setSaveMessage] = useState({ type: '', text: '' })

    // Security State
    const [passwordData, setPasswordData] = useState({ newPassword: '', confirmPassword: '' })
    const [newAdminData, setNewAdminData] = useState({ email: '', password: '' })
    const [users, setUsers] = useState<any[]>([])

    useEffect(() => {
        loadSettings()
        if (activeTab === 'security') {
            loadUsers()
        }
    }, [activeTab])

    const loadSettings = async () => {
        try {
            const data = await settingsService.get()
            if (data) {
                setSettings(data)
            }
        } catch (error) {
            console.error('Failed to load settings:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const loadUsers = async () => {
        try {
            const res = await fetch('/api/admin/users')
            const data = await res.json()
            if (Array.isArray(data)) {
                setUsers(data)
            }
        } catch (error) {
            console.error('Failed to load users:', error)
        }
    }

    const handleSaveSettings = async () => {
        setIsSaving(true)
        setSaveMessage({ type: '', text: '' })

        try {
            await settingsService.update(settings)
            setSaveMessage({ type: 'success', text: 'Settings saved successfully!' })
            setTimeout(() => setSaveMessage({ type: '', text: '' }), 3000)
        } catch (error) {
            console.error('Failed to save settings:', error)
            setSaveMessage({ type: 'error', text: 'Failed to save settings. Please try again.' })
        } finally {
            setIsSaving(false)
        }
    }

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault()
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("Passwords don't match")
            return
        }

        try {
            const { error } = await supabase.auth.updateUser({ password: passwordData.newPassword })
            if (error) throw error
            alert('Password updated successfully')
            setPasswordData({ newPassword: '', confirmPassword: '' })
        } catch (error: any) {
            alert(error.message)
        }
    }

    const handleCreateAdmin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await fetch('/api/admin/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAdminData)
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error)

            alert('Admin user created successfully')
            setNewAdminData({ email: '', password: '' })
            loadUsers()
        } catch (error: any) {
            alert(error.message)
        }
    }

    if (isLoading) {
        return (
            <div className="flex justify-center p-12">
                <Loader2 className="w-8 h-8 text-spa-green-500 animate-spin" />
            </div>
        )
    }

    return (
        <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-spa-gray-900 mb-2">Settings</h1>
                <p className="text-spa-gray-600">Manage your spa website configuration</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-spa-gray-200">
                <button
                    onClick={() => setActiveTab('general')}
                    className={`pb-4 px-2 font-medium transition-colors relative ${activeTab === 'general'
                            ? 'text-spa-green-600'
                            : 'text-spa-gray-500 hover:text-spa-gray-700'
                        }`}
                >
                    General
                    {activeTab === 'general' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-spa-green-600" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('security')}
                    className={`pb-4 px-2 font-medium transition-colors relative ${activeTab === 'security'
                            ? 'text-spa-green-600'
                            : 'text-spa-gray-500 hover:text-spa-gray-700'
                        }`}
                >
                    Security & Users
                    {activeTab === 'security' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-spa-green-600" />
                    )}
                </button>
            </div>

            {activeTab === 'general' ? (
                <div className="bg-white rounded-2xl shadow-lg border border-spa-gray-100 p-8 space-y-8 animate-fadeIn">
                    {/* General Settings Content (Same as before) */}
                    <div className="border-b border-spa-gray-100 pb-8">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-spa-green-100 flex items-center justify-center text-spa-green-600 hidden md:flex">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <label className="block text-lg font-semibold text-spa-gray-900 mb-2">
                                    Contact Number
                                </label>
                                <input
                                    type="tel"
                                    value={settings.phone_number}
                                    onChange={(e) => setSettings({ ...settings, phone_number: e.target.value })}
                                    className="w-full px-4 py-3 bg-spa-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-spa-green-500 focus:outline-none transition-all font-medium text-spa-gray-900"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-spa-green-100 flex items-center justify-center text-spa-green-600 hidden md:flex">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <label className="block text-lg font-semibold text-spa-gray-900 mb-2">
                                    Google Maps Location
                                </label>
                                <textarea
                                    value={settings.maps_embed_url}
                                    onChange={(e) => setSettings({ ...settings, maps_embed_url: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-spa-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-spa-green-500 focus:outline-none transition-all font-mono text-sm text-spa-gray-600"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                        <div className="flex-1">
                            {saveMessage.text && (
                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium animate-fadeIn ${saveMessage.type === 'success'
                                    ? 'bg-green-50 text-green-700 border border-green-200'
                                    : 'bg-red-50 text-red-700 border border-red-200'
                                    }`}>
                                    {saveMessage.type === 'success' && <CheckCircle className="w-4 h-4" />}
                                    {saveMessage.text}
                                </div>
                            )}
                        </div>
                        <button
                            onClick={handleSaveSettings}
                            disabled={isSaving}
                            className="btn-spa btn-primary px-8 py-3 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-8 animate-fadeIn">
                    {/* Change Password Section */}
                    <div className="bg-white rounded-2xl shadow-lg border border-spa-gray-100 p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-spa-green-100 flex items-center justify-center text-spa-green-600">
                                <Lock className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-bold text-spa-gray-900">Change Your Password</h2>
                        </div>
                        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                            <div>
                                <label className="block text-sm font-medium text-spa-gray-700 mb-1">New Password</label>
                                <input
                                    type="password"
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                    className="w-full px-4 py-2 border border-spa-gray-200 rounded-xl focus:ring-2 focus:ring-spa-green-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-spa-gray-700 mb-1">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                    className="w-full px-4 py-2 border border-spa-gray-200 rounded-xl focus:ring-2 focus:ring-spa-green-500 outline-none"
                                />
                            </div>
                            <button type="submit" className="btn-spa btn-primary w-full justify-center">
                                Update Password
                            </button>
                        </form>
                    </div>

                    {/* Add Admin Section */}
                    <div className="bg-white rounded-2xl shadow-lg border border-spa-gray-100 p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-spa-green-100 flex items-center justify-center text-spa-green-600">
                                <UserPlus className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-bold text-spa-gray-900">Add New Admin</h2>
                        </div>
                        <form onSubmit={handleCreateAdmin} className="space-y-4 max-w-md">
                            <div>
                                <label className="block text-sm font-medium text-spa-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={newAdminData.email}
                                    onChange={(e) => setNewAdminData({ ...newAdminData, email: e.target.value })}
                                    className="w-full px-4 py-2 border border-spa-gray-200 rounded-xl focus:ring-2 focus:ring-spa-green-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-spa-gray-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    value={newAdminData.password}
                                    onChange={(e) => setNewAdminData({ ...newAdminData, password: e.target.value })}
                                    className="w-full px-4 py-2 border border-spa-gray-200 rounded-xl focus:ring-2 focus:ring-spa-green-500 outline-none"
                                />
                            </div>
                            <button type="submit" className="btn-spa text-white bg-spa-gray-900 hover:bg-black w-full justify-center">
                                Create Admin User
                            </button>
                        </form>
                    </div>

                    {/* User List */}
                    <div className="bg-white rounded-2xl shadow-lg border border-spa-gray-100 p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-spa-green-100 flex items-center justify-center text-spa-green-600">
                                <User className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-bold text-spa-gray-900">Existing Users</h2>
                        </div>
                        <div className="space-y-2">
                            {users.map((user: any) => (
                                <div key={user.id} className="p-4 bg-spa-gray-50 rounded-xl flex justify-between items-center text-sm">
                                    <span className="font-medium text-spa-gray-900">{user.email}</span>
                                    <span className="text-xs bg-spa-green-100 text-spa-green-700 px-2 py-1 rounded-full">
                                        {user.user_metadata?.role || 'user'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

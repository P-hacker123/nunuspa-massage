'use client'

import { useEffect, useState } from 'react'
import { settingsService } from '@/lib/supabase'
import { Settings as SettingsType } from '@/types'
import { Save, Phone, MapPin, Globe, Loader2, CheckCircle } from 'lucide-react'

export default function SettingsPage() {
    const [settings, setSettings] = useState<SettingsType>({
        phone_number: '+250 787 891 778',
        maps_embed_url: '',
    })
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [saveMessage, setSaveMessage] = useState({ type: '', text: '' })

    useEffect(() => {
        loadSettings()
    }, [])

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

    const handleSave = async () => {
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

            <div className="bg-white rounded-2xl shadow-lg border border-spa-gray-100 p-8">
                <div className="space-y-8">
                    {/* Phone Number Section */}
                    <div className="border-b border-spa-gray-100 pb-8">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-spa-green-100 flex items-center justify-center text-spa-green-600 hidden md:flex">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <label className="block text-lg font-semibold text-spa-gray-900 mb-2">
                                    Contact Number
                                </label>
                                <p className="text-spa-gray-500 text-sm mb-4">
                                    This number will be displayed in the contact section and navigation bar.
                                </p>
                                <input
                                    type="tel"
                                    value={settings.phone_number}
                                    onChange={(e) => setSettings({ ...settings, phone_number: e.target.value })}
                                    className="w-full px-4 py-3 bg-spa-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-spa-green-500 focus:outline-none transition-all font-medium text-spa-gray-900"
                                    placeholder="+250 787 891 778"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Maps Section */}
                    <div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-spa-green-100 flex items-center justify-center text-spa-green-600 hidden md:flex">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <label className="block text-lg font-semibold text-spa-gray-900 mb-2">
                                    Google Maps Location
                                </label>
                                <p className="text-spa-gray-500 text-sm mb-4">
                                    Paste the iframe URL from Google Maps to update the location display.
                                </p>
                                <textarea
                                    value={settings.maps_embed_url}
                                    onChange={(e) => setSettings({ ...settings, maps_embed_url: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-spa-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-spa-green-500 focus:outline-none transition-all font-mono text-sm text-spa-gray-600"
                                    placeholder="https://www.google.com/maps/embed?..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Bar */}
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
                            onClick={handleSave}
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
            </div>
        </div>
    )
}

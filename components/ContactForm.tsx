'use client'

import { useState } from 'react'
import { messageService } from '@/lib/supabase'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setStatus('idle')

        try {
            await messageService.create({
                ...formData,
                is_read: false,
            })
            setStatus('success')
            setFormData({ name: '', email: '', message: '' })
            // Reset status after 5 seconds
            setTimeout(() => setStatus('idle'), 5000)
        } catch (error) {
            console.error('Failed to send message:', error)
            setStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            {status === 'success' ? (
                <div className="text-center py-12 animate-fadeIn">
                    <div className="w-16 h-16 bg-spa-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-spa-green-600" />
                    </div>
                    <h4 className="text-xl font-bold text-spa-gray-900 mb-2">Message Sent!</h4>
                    <p className="text-spa-gray-600">
                        Thank you for contacting us. We will get back to you shortly.
                    </p>
                    <button
                        onClick={() => setStatus('idle')}
                        className="mt-6 text-spa-green-600 font-medium hover:text-spa-green-700 underline"
                    >
                        Send another message
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-spa-gray-700 mb-1">
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="w-full px-4 py-3 border border-spa-gray-200 rounded-xl focus:ring-2 focus:ring-spa-green-500 focus:border-transparent outline-none transition-all bg-spa-gray-50/50"
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-spa-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="w-full px-4 py-3 border border-spa-gray-200 rounded-xl focus:ring-2 focus:ring-spa-green-500 focus:border-transparent outline-none transition-all bg-spa-gray-50/50"
                            placeholder="john@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-spa-gray-700 mb-1">
                            Message
                        </label>
                        <textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                            rows={4}
                            className="w-full px-4 py-3 border border-spa-gray-200 rounded-xl focus:ring-2 focus:ring-spa-green-500 focus:border-transparent outline-none transition-all resize-none bg-spa-gray-50/50"
                            placeholder="How can we help you?"
                        />
                    </div>

                    {status === 'error' && (
                        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm">
                            <AlertCircle className="w-4 h-4" />
                            Failed to send message. Please try again.
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-spa-green-600 text-white font-bold rounded-xl hover:bg-spa-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-spa-green-600/20"
                    >
                        {isSubmitting ? (
                            'Sending...'
                        ) : (
                            <>
                                Send Message
                                <Send className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>
            )}
        </>
    )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Mail, Lock, LogIn, Sparkles } from 'lucide-react'

export default function AdminLoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const { error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (authError) {
            setError(authError.message)
            setLoading(false)
        } else {
            router.push('/admin/dashboard')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-spa-green-50 via-white to-spa-green-50 px-6 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-spa-green-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-spa-green-100/30 rounded-full blur-3xl" />

            <div className="w-full max-w-md relative z-10">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-spa-green-500 to-spa-green-600 rounded-2xl shadow-xl mb-4">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-spa-gray-900 mb-2">Nunu Spa Admin</h1>
                    <p className="text-spa-gray-600">Sign in to manage your spa</p>
                </div>

                {/* Login Card */}
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-spa-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className="flex items-center gap-2 text-spa-gray-900 font-medium mb-2">
                                <Mail className="w-5 h-5 text-spa-green-600" />
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-5 py-4 bg-white border-2 border-spa-gray-200 rounded-xl focus:border-spa-green-500 focus:ring-4 focus:ring-spa-green-100 focus:outline-none transition-all duration-300 text-spa-gray-900 placeholder:text-spa-gray-400"
                                placeholder="admin@nunuspa.com"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="flex items-center gap-2 text-spa-gray-900 font-medium mb-2">
                                <Lock className="w-5 h-5 text-spa-green-600" />
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-5 py-4 bg-white border-2 border-spa-gray-200 rounded-xl focus:border-spa-green-500 focus:ring-4 focus:ring-spa-green-100 focus:outline-none transition-all duration-300 text-spa-gray-900 placeholder:text-spa-gray-400"
                                placeholder="Enter your password"
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-gradient-to-r from-spa-green-500 to-spa-green-600 text-white rounded-xl hover:shadow-lg hover:shadow-spa-green-500/50 transition-all duration-300 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                'Signing in...'
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5" />
                                    Sign In
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer note */}
                <p className="text-center text-spa-gray-500 text-sm mt-6">
                    Contact support if you need access
                </p>
            </div>
        </div>
    )
}

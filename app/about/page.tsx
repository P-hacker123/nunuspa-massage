'use client'

import { useEffect, useState } from 'react'
import PageHeader from '@/components/PageHeader'
import WhyChooseUs from '@/components/WhyChooseUs'
import { Sparkles, Heart, Users } from 'lucide-react'
import { teamService } from '@/lib/supabase'
import { TeamMember } from '@/types'

export default function AboutPage() {
    const [team, setTeam] = useState<TeamMember[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        loadTeam()
    }, [])

    const loadTeam = async () => {
        try {
            const data = await teamService.getAll()
            setTeam(data)
        } catch (error) {
            console.error('Failed to load team:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className="min-h-screen pt-20">
            <PageHeader
                title="About Nunu Spa"
                subtitle="Your sanctuary of peace in the heart of Kigali. We are dedicated to providing the ultimate relaxation experience."
            />

            {/* Intro Section with Image */}
            <div className="py-20 bg-white overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8 animate-fadeInLeft">
                            <div className="inline-flex items-center gap-2 bg-spa-green-50 px-4 py-1.5 rounded-full text-spa-green-700 font-medium text-sm">
                                <Sparkles className="w-4 h-4" />
                                <span>Est. 2024</span>
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-spa-gray-900 leading-tight">
                                A Haven of Tranquility in <span className="text-spa-green-600">Kigali</span>
                            </h2>
                            <div className="space-y-4 text-lg text-spa-gray-600 leading-relaxed">
                                <p>
                                    At Nunu Spa, we believe that relaxation is not just a luxury, but a necessity. Our spa is designed to be a retreat from the chaos of everyday life, offering a peaceful environment where you can unwind and reconnect with yourself.
                                </p>
                                <p>
                                    Located in the serene landscaped gardens of Kigali, just minutes from the city center, we offer a sanctuary where time stands still.
                                </p>
                            </div>
                            <div className="pt-4">
                                <div className="flex gap-8">
                                    <div>
                                        <div className="text-3xl font-bold text-spa-green-600">5+</div>
                                        <div className="text-sm text-spa-gray-500 uppercase tracking-wide mt-1">Years Experience</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-spa-green-600">1k+</div>
                                        <div className="text-sm text-spa-gray-500 uppercase tracking-wide mt-1">Happy Clients</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative lg:h-[600px] h-[400px] rounded-3xl overflow-hidden shadow-2xl group animate-fadeInRight">
                            <img
                                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
                                alt="Spa Interior"
                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="py-20 bg-spa-cream/30">
                <div className="container mx-auto px-6 text-center max-w-4xl">
                    <Heart className="w-12 h-12 text-spa-green-500 mx-auto mb-6" />
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-spa-gray-900 mb-8">Our Mission</h2>
                    <p className="text-xl md:text-2xl text-spa-gray-700 font-medium leading-relaxed italic">
                        "To provide a holistic wellness experience that rejuvenates the body, calms the mind, and uplifts the spirit through expert touch and natural therapies."
                    </p>
                </div>
            </div>

            {/* Team Section */}
            <div className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-spa-green-50 px-4 py-1.5 rounded-full text-spa-green-700 font-medium text-sm mb-4">
                            <Users className="w-4 h-4" />
                            <span>Our Experts</span>
                        </div>
                        <h2 className="text-4xl font-bold text-spa-gray-900 mb-4">Meet Our Therapists</h2>
                        <p className="text-lg text-spa-gray-600 max-w-2xl mx-auto">
                            Our team of certified professionals is dedicated to your well-being, bringing years of experience and specialized techniques to every session.
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="text-center text-spa-gray-500">Loading team...</div>
                    ) : (
                        <div className="grid md:grid-cols-3 gap-8">
                            {team.map((member) => (
                                <div key={member.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-spa-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
                                    <div className="h-80 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-spa-green-900/10 group-hover:bg-transparent transition-colors z-10" />
                                        {member.image_url ? (
                                            <img
                                                src={member.image_url}
                                                alt={member.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-spa-gray-100 flex items-center justify-center text-spa-gray-400">
                                                <Users className="w-20 h-20" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-8 text-center">
                                        <h3 className="text-xl font-bold text-spa-gray-900 mb-1">{member.name}</h3>
                                        <p className="text-spa-green-600 font-medium text-sm mb-4">{member.role}</p>
                                        <p className="text-spa-gray-600 text-sm leading-relaxed">{member.bio}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <WhyChooseUs />
        </main>
    )
}

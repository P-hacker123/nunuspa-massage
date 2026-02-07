'use client'

import { Heart, Users, Leaf, Award } from 'lucide-react'

const features = [
    {
        icon: Users,
        title: 'Professional Therapists',
        description: 'Our certified therapists bring years of experience and genuine care to every session.',
    },
    {
        icon: Leaf,
        title: 'Calm Environment',
        description: 'Immerse yourself in a tranquil oasis designed to soothe your mind and body.',
    },
    {
        icon: Heart,
        title: 'Personalized Care',
        description: 'Every treatment is tailored to your unique needs and wellness goals.',
    },
    {
        icon: Award,
        title: 'Premium Quality',
        description: 'We use only the finest organic products and proven therapeutic techniques.',
    },
]

export default function WhyChooseUs() {
    return (
        <section id="about" className="py-20 px-6 bg-white relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-spa-green-100 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-spa-green-50 rounded-full blur-3xl opacity-50" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-spa-green-100 px-6 py-2 rounded-full mb-4">
                        <Leaf className="w-5 h-5 text-spa-green-600" />
                        <span className="text-spa-green-700 font-medium">Why Choose Us</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-spa-gray-900 mb-6">
                        Experience the Nunu Difference
                    </h2>
                    <p className="text-xl text-spa-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Your body deserves more than a break. It needs a session. From deep tissue to foot reflexology,
                        we've got the perfect escape waiting for you.
                    </p>
                </div>

                {/* Features grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <div
                                key={feature.title}
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-spa-gray-100 group"
                                style={{
                                    animationDelay: `${index * 0.15}s`,
                                    animation: 'fadeIn 0.8s ease-out forwards',
                                }}
                            >
                                {/* Icon */}
                                <div className="w-16 h-16 mb-6 bg-gradient-to-br from-spa-green-500 to-spa-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <Icon className="w-8 h-8 text-white" />
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-spa-gray-900 mb-3">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-spa-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

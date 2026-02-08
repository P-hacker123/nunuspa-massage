import PageHeader from '@/components/PageHeader'
import ServicesSection from '@/components/ServicesSection'
import BookingSection from '@/components/BookingSection'

import MapEmbed from '@/components/MapEmbed'

export default function ServicesPage() {
    return (
        <main className="min-h-screen pt-20">
            <PageHeader
                title="Our Treatments"
                subtitle="Discover our range of relaxing and therapeutic massages designed to rejuvenate your body and mind."
                backgroundSlot={
                    <div className="w-full h-full">
                        <MapEmbed className="w-full h-full object-cover opacity-60" />
                    </div>
                }
            />
            <ServicesSection />
            <div className="bg-spa-cream py-16">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-serif font-bold text-spa-gray-900 mb-6">Ready to Book?</h2>
                    <p className="text-spa-gray-600 mb-8 max-w-2xl mx-auto">
                        Select your preferred service and time. We'll verify your booking instantly.
                    </p>
                    <BookingSection />
                </div>
            </div>
        </main>
    )
}

import PageHeader from '@/components/PageHeader'
import BookingSection from '@/components/BookingSection'

export default function BookingPage() {
    return (
        <main className="min-h-screen pt-20">
            <PageHeader
                title="Book Your Session"
                subtitle="Reserve your time for relaxation. Simple, fast, and secure booking."
            />
            <div className="py-12 bg-spa-cream to-white">
                <BookingSection />
            </div>
        </main>
    )
}

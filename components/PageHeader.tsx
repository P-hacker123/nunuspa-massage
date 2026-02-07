export default function PageHeader({
    title,
    subtitle,
    bgImage = "url('/images/hero-bg.jpg')"
}: {
    title: string
    subtitle: string
    bgImage?: string
}) {
    return (
        <div className="relative py-24 md:py-32 bg-spa-green-900 overflow-hidden">
            <div className="absolute inset-0 bg-black/20 z-10" />
            <div className="absolute inset-0 opacity-30 mix-blend-overlay">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-50" />
            </div>
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-spa-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-spa-gold rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-6 relative z-20 text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 animate-fadeIn">
                    {title}
                </h1>
                <p className="text-lg md:text-xl text-spa-green-100 max-w-2xl mx-auto font-light animate-slideUp">
                    {subtitle}
                </p>
            </div>
        </div>
    )
}

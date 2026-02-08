import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-spa-gray-900 text-white py-12 border-t border-spa-gray-800">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
                    {/* Brand */}
                    <div>
                        <p className="font-serif text-2xl mb-4 text-spa-green-400">Nunu Spa</p>
                        <p className="text-spa-gray-400 text-sm">
                            Kigali's premier destination for relaxation and rejuvenation.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col gap-2 text-sm text-spa-gray-400">
                        <Link href="/services" className="hover:text-white transition-colors">Services</Link>
                        <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
                        <Link href="/booking" className="hover:text-white transition-colors">Book Now</Link>
                        <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                        <Link href="/admin/login" className="hover:text-white transition-colors mt-2 text-xs opacity-50">Admin Login</Link>
                    </div>

                    {/* Copyright */}
                    <div className="text-spa-gray-500 text-sm md:text-right">
                        <p>© {new Date().getFullYear()} Nunu Spa.</p>
                        <p>All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

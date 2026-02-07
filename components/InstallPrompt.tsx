'use client'

import { useState, useEffect } from 'react'
import { X, Download, Share } from 'lucide-react'

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
    const [showPrompt, setShowPrompt] = useState(false)
    const [isIOS, setIsIOS] = useState(false)

    useEffect(() => {
        // Register Service Worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/sw.js')
                .then((registration) => console.log('Scope: ', registration.scope))
                .catch((err) => console.log('SW Registration Failed: ', err));
        }

        // Check if device is iOS
        const isIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
        setIsIOS(isIosDevice);

        // Check if already in standalone mode
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;

        if (isStandalone) {
            return;
        }

        const handleBeforeInstallPrompt = (e: Event) => {
            console.log('beforeinstallprompt fired');
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault()
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e)
            // Show the prompt
            setShowPrompt(true)
        }

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

        // Force show for testing/dev if no event fires (Optional: remove in prod)
        // const timer = setTimeout(() => setShowPrompt(true), 2000);

        // Show prompt for iOS users after a delay (if not already installed/dismissed)
        if (isIosDevice && !localStorage.getItem('installPromptDismissed')) {
            setTimeout(() => setShowPrompt(true), 3000);
        }

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
            // clearTimeout(timer);
        }
    }, [])

    const handleInstallClick = async () => {
        if (!deferredPrompt) {
            return
        }

        // Show the install prompt
        deferredPrompt.prompt()

        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice

        // We've used the prompt, and can't use it again, discard it
        setDeferredPrompt(null)
        setShowPrompt(false)
    }

    const handleDismiss = () => {
        setShowPrompt(false)
        localStorage.setItem('installPromptDismissed', 'true')
    }

    if (!showPrompt) return null

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white rounded-2xl shadow-2xl border border-spa-gray-100 p-6 z-50 animate-slideIn">
            <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 text-spa-gray-400 hover:text-spa-gray-600 transition-colors"
            >
                <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-spa-green-100 flex items-center justify-center text-spa-green-600 flex-shrink-0">
                    <Download className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-spa-gray-900 mb-1">Install App</h3>
                    <p className="text-spa-gray-600 text-sm mb-4">
                        {isIOS
                            ? "Install our app for a better experience. Tap the share button below and select 'Add to Home Screen'."
                            : "Install our app for a better experience. Quick access to bookings and exclusive offers."
                        }
                    </p>

                    {isIOS ? (
                        <div className="flex items-center gap-2 text-sm text-spa-green-700 bg-spa-green-50 px-3 py-2 rounded-lg">
                            <Share className="w-4 h-4" />
                            <span className="font-medium">Tap Share {'>'} Add to Home Screen</span>
                        </div>
                    ) : (
                        <button
                            onClick={handleInstallClick}
                            className="btn-spa btn-primary w-full justify-center text-sm py-2"
                        >
                            Install Now
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
